<?php

namespace App\Controller;

use Symfony\Component\HTTPFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; 

class HTMXController extends AbstractController {
    public function searchPanel() {
        return $this->render('components/search-panel.html.twig');
    }
}
