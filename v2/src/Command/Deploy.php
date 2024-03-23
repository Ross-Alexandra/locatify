<?php

namespace App\Command;

use \PharData;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

#[AsCommand(
    name: 'app:deploy',
    description: 'Deploys to a remote server for production.'
)]
class Deploy extends Command {
    public function __construct() {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int {
        $projectRoot = dirname(dirname(dirname(__FILE__)));

        $deployScript = new Process(['./bin/deploy']);
        $deployScript->setWorkingDirectory($projectRoot);
        $deployScript->run();

        foreach ($deployScript as $type => $data) {
            if ($deployScript::OUT === $type) {
                echo "$data";
            } else { // $process::ERR === $type
                echo "$data";
            }
        }

        if (!$deployScript->isSuccessful()) {
            throw new ProcessFailedException($deployScript);
        }

        return Command::SUCCESS;
    }
}

?>
