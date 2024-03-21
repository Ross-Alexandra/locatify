<?php

namespace App\Command;

use \PharData;

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

    private static function delTree($dir) {
        $subFile = glob("$dir/*");
        $deepFiles = glob("$dir/**/*");

        foreach(array_merge($deepFiles, $subFile) as $file) {
            if (is_file($file)) {
                unlink($file);
            } else {
                rmdir($file);
            }
        }

        rmdir($dir);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {
        $url = "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={$this->mmLicense}&suffix=tar.gz";
        $home = getenv('HOME');
        $locatifyDirectory = "$home/locatify";
        $fileName = "$locatifyDirectory/mmdb_data.tar.gz";

        if (!file_exists($locatifyDirectory)) {
            # Create the directory if it doesn't exist, and
            # do it recursively.
            mkdir($locatifyDirectory, 0770, true);
        }

        if (file_put_contents($fileName, file_get_contents($url))) {
            $pharDecompress = new PharData($fileName);
            $pharDecompress->decompress();

            $decompressedFilename = str_replace('.gz', '', $fileName);
            $extractOutFolder = str_replace('.tar.gz', '', $fileName);
            $pharExtract = new PharData($decompressedFilename);
            $pharExtract->extractTo($extractOutFolder);

            $mmdbFiles = glob("$extractOutFolder/**/*.mmdb");

            foreach($mmdbFiles as $mmdbFile) {
                rename($mmdbFile, "$locatifyDirectory/database.mmdb");
            }

            unlink("$locatifyDirectory/mmdb_data.tar");
            unlink("$locatifyDirectory/mmdb_data.tar.gz");
            $this->delTree("$locatifyDirectory/mmdb_data");
        } else {
            echo "Failed to download mmdb file\n";
        }

        return Command::SUCCESS;
    }
}

?>
