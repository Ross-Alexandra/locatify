<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HTTPFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; 

use Psr\Log\LoggerInterface;

class HTMXController extends AbstractController {
    private function htmxRenderPage(Request $request, $baseRoute) {
        $isHtmx = $request->headers->get('hx-request');

        if ($isHtmx) {
            return $this->render("$baseRoute/htmx-index.html.twig");
        } else {
            return $this->render("$baseRoute/index.html.twig");
        }
    }
    
    public function search(Request $request) {
        return $this->htmxRenderPage($request, 'pages/search');
    }

    public function results(Request $request, LoggerInterface $logger) {
        $logger->debug("params: {params}", [
            'params' => print_r($request->query->all(), true),
        ]);

        return $this->htmxRenderPage($request, 'pages/results');
    }
}
