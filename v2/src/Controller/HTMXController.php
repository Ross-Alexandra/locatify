<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;

use MaxMind\Db\Reader;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HTTPFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController; 

class HTMXController extends AbstractController {
    private function htmxRenderPage(Request $request, $baseRoute, $data = []) {
        $isHtmx = $request->headers->get('hx-request');

        if ($isHtmx) {
            return $this->render("$baseRoute/htmx-index.html.twig", $data);
        } else {
            return $this->render("$baseRoute/index.html.twig", $data);
        }
    }
    
    public function search(Request $request) {
        return $this->htmxRenderPage($request, 'pages/search');
    }

    public function results(Request $request, LoggerInterface $logger) {
        $home = getenv('HOME');
        $locatifyDirectory = "$home/locatify";
        $reader = new Reader("$home/locatify/database.mmdb");

        $ipsToLookup = $request->get('ip');
        $ipInfo = [];

        foreach($ipsToLookup as $lookup) {
            $ipData = $reader->get($lookup['ip']);

            array_push($ipInfo, [
                'data' => [
                    'city' => parse_city($ipData),
                    'country' => parse_country($ipData),
                    'postalCode' => parse_postal_code($ipData),
                    'latitude' => parse_latitude($ipData),
                    'longitude' => parse_longitude($ipData),
                    'accuracy' => parse_accuracy($ipData),
                    'timezone' => parse_timezone($ipData),
                ],
                'label' => $lookup['label'],
                'ip' => $lookup['ip'],
            ]);
        }

        return $this->render("pages/results/htmx-index.html.twig", ['ipInfo' => $ipInfo]);
    }
}

function parse_city($ipData) {
    return (array_key_exists('city', $ipData) && array_key_exists('name', $ipData['city'])) ? $ipData['city']['name'] : 'Unknown City';
}

function parse_country($ipData) {
    return (array_key_exists('country', $ipData) && array_key_exists('iso_code', $ipData['country'])) ? $ipData['country']['iso_code'] : 'Unknown Country';
}

function parse_postal_code($ipData) {
    return (array_key_exists('postal', $ipData) && array_key_exists('code', $ipData['postal'])) ? $ipData['postal']['code'] : 'Unknown';
}

function parse_latitude($ipData) {
    return (array_key_exists('location', $ipData) && array_key_exists('latitude', $ipData['location'])) ? $ipData['location']['latitude'] : 0;
}

function parse_longitude($ipData) {
    return (array_key_exists('location', $ipData) && array_key_exists('longitude', $ipData['location'])) ? $ipData['location']['longitude'] : 0;
}

function parse_accuracy($ipData) {
    return (array_key_exists('location', $ipData) && array_key_exists('accuracy_radius', $ipData['location'])) ? $ipData['location']['accuracy_radius'] : INF;
}

function parse_timezone($ipData) {
    return (array_key_exists('location', $ipData) && array_key_exists('timezone', $ipData['location'])) ? $ipData['location']['timezone'] : 'Unknown';
}
