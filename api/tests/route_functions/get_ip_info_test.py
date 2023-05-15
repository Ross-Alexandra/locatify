import pytest
from unittest import mock

from api.route_functions.get_ip_info import get_ip_info
from geoip2.errors import AddressNotFoundError

def raise_AddressNotFoundError(_):
    raise AddressNotFoundError('Test error')

def raise_Exception(_):
    raise Exception('Test error')

def test_404_returned_if_ip_not_found():
    raising_reader = mock.Mock()
    raising_reader.city = mock.Mock(side_effect=raise_AddressNotFoundError)

    response = get_ip_info(raising_reader, "1.1.1.1")
    assert response["status"] == 404
    assert response["ip_address"] == "1.1.1.1"

def test_400_returned_if_problem_with_lookup():
    raising_reader = mock.Mock()
    raising_reader.city = mock.Mock(side_effect=raise_Exception)

    response = get_ip_info(raising_reader, "1.1.1.1")
    assert response['status'] == 400
    assert response['ip_address'] == "1.1.1.1"

def test_200_returned_if_ip_found():
    cityMock = mock.MagicMock()
    cityMock.configure_mock(name="a")

    reader = mock.Mock()
    reader.city = mock.Mock(return_value=mock.Mock(
        country=mock.Mock(iso_code="US"),
        postal=mock.Mock(code="12345"),
        location=mock.Mock(
            time_zone="America/New_York",
            latitude=1.1,
            longitude=2.2,
            accuracy_radius=3,
        ),
        city=cityMock,
    ))

    response = get_ip_info(reader, "1.1.1.1")
    assert response['status'] == 200
    assert response['ip_address'] == "1.1.1.1"
    assert response['country_code'] == "US"
    assert response['postal_code'] == "12345"
    assert response['city'] == "a"
    assert response['time_zone'] == "America/New_York"
    assert response['latitude'] == 1.1
    assert response['longitude'] == 2.2
    assert response['accuracy_radius'] == 3
