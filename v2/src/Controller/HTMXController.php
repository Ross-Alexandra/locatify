<?php

namespace App\Controller;

use \DateTime;
use \DateTimeZone;

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
    
    public function index(Request $request) {
        return $this->render("pages/search/index.html.twig");
    }

    public function search(Request $request) {
        return $this->htmxRenderPage($request, 'pages/search');
    }

    public function results(Request $request) {
        $home = getenv('HOME');
        $locatifyDirectory = "$home/locatify";
        $reader = new Reader("$home/locatify/database.mmdb");

        $ipsToLookup = $request->get('ip');
        $ipInfo = [];

        foreach($ipsToLookup as $lookup) {
            $ipData = $reader->get($lookup['ip']) ?? [];

            array_push($ipInfo, [
                'data' => [
                    'city' => parse_city($ipData),
                    'country' => parse_country($ipData),
                    'postalCode' => parse_postal_code($ipData),
                    'latitude' => parse_latitude($ipData),
                    'longitude' => parse_longitude($ipData),
                    'accuracy' => parse_accuracy($ipData),
                    'time' => parse_time($ipData),
                    'mapLink' => parse_maps_link($ipData),
                ],
                'label' => $lookup['label'],
                'ip' => $lookup['ip'],
            ]);
        }

        return $this->render("pages/results/htmx-index.html.twig", ['ipInfo' => $ipInfo]);
    }
}

function parse_city($ipData) {
    if (array_key_exists('city', $ipData) && array_key_exists('name', $ipData['city'])) {
        return $ipData['city']['name'];
    } else if (
        array_key_exists('city', $ipData)
        && array_key_exists('names', $ipData['city'])
        && array_key_exists('en', $ipData['city']['names'])
    ) {
        return $ipData['city']['names']['en'];
    } else if (
        array_key_exists('subdivisions', $ipData)
        && array_key_exists(0, $ipData['subdivisions'])
        && array_key_exists('names', $ipData['subdivisions'][0])
        && array_key_exists('en', $ipData['subdivisions'][0]['names'])
    ) {
        return $ipData['subdivisions'][0]['names']['en'];
    } else {
        return 'Unknown City';
    }
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
    return (array_key_exists('location', $ipData) && array_key_exists('accuracy_radius', $ipData['location'])) ? $ipData['location']['accuracy_radius'] : 'Unknown';
}

function parse_time($ipData) {
    if (!array_key_exists('location', $ipData) || !array_key_exists('time_zone', $ipData['location'])) {
        return 'Unknown';
    }

    $timezone = $ipData['location']['time_zone'];
    $date = new DateTime('now', new DateTimeZone($timezone));
    return $date->format('h:i a e(P)');
}

function parse_maps_link($ipData) {
    if (
        !array_key_exists('location', $ipData)
        || !array_key_exists('latitude', $ipData['location'])
        || !array_key_exists('longitude', $ipData['location'])
    ) {
        return null;
    }

    $lat = $ipData['location']['latitude'];
    $long = $ipData['location']['longitude'];

    return "https://maps.google.com/maps?output=embed&q=$lat,$long";
}
