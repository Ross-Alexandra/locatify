<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'app:download-mmdb-file',
    description: 'Downloads a MaxMind DB file.'
)]
class DownloadMMDBFile extends Command {
    private $mmLicense;

    public function __construct($mmLicense) {
        parent::__construct();
        $this->mmLicense = $mmLicense;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {
        $url = "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={$this->mmLicense}&suffix=tar.gz";
        $home = getenv('HOME');
        $locatifyDirectory = "$home/locatify";
        $fileName = "$locatifyDirectory/mmdb_database.tar.gz";

        if (!file_exists($locatifyDirectory)) {
            # Create the directory if it doesn't exist, and
            # do it recursively.
            mkdir($locatifyDirectory, 0770, true);
        }

        if (file_put_contents($fileName, file_get_contents($url))) {
            $bufferSize = 4096;
            $mmdbFileName = str_replace('.tar.gz', '', $fileName);

            $file = gzopen($fileName, 'rb');
            $outFile = fopen($mmdbFileName, 'wb');

            while (!gzeof($file)) {
                fwrite($outFile, gzread($file, $bufferSize));
            }

            fclose($outFile);
            gzclose($file);

            echo "Successfully downloaded & extracted mmdb file\n";
        } else {
            echo "Failed to download mmdb file\n";
        }

        return Command::SUCCESS;
    }
}

?>
