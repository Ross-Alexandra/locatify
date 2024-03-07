<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; 

class DefaultController extends AbstractController {
    public function search(): Response {
        return $this->render('pages/search.html.twig');
    }

    public function results(): Response {
        return $this->render('pages/results.html.twig');
    }
}
