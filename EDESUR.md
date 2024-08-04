curl 'https://ovapi.edesur.com.do/ovapi/Client/ConfirmUserEMail?myUserName=wovalle' \
 -H 'Accept: application/json, text/plain, _/_' \
 -H 'Sec-Fetch-Dest: empty' \
 -H 'Sec-Fetch-Mode: cors' \
 -H 'Sec-Fetch-Site: same-site' \
 -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
 -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
 -H 'sec-ch-ua-mobile: ?0' \
 -H 'sec-ch-ua-platform: "macOS"'

# Login

curl 'https://ovapi.edesur.com.do/ovapi/getToken' \
 -H 'Accept: application/json, text/plain, _/_' \
 -H 'Accept-Language: en-US,en;q=0.9,es-DO;q=0.8,es;q=0.7,de;q=0.6' \
 -H 'Connection: keep-alive' \
 -H 'Content-Type: application/x-www-form-urlencoded' \
 -H 'DNT: 1' \
 -H 'Origin: https://ov.edesur.com.do' \
 -H 'Referer: https://ov.edesur.com.do/login' \
 -H 'Sec-Fetch-Dest: empty' \
 -H 'Sec-Fetch-Mode: cors' \
 -H 'Sec-Fetch-Site: same-site' \
 -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
 -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
 -H 'sec-ch-ua-mobile: ?0' \
 -H 'sec-ch-ua-platform: "macOS"' \
 --data-raw 'grant_type=password&username=wovalle&password={{password}}'

# Get Contract List

curl 'https://ovapi.edesur.com.do/ovapi/Contract/getContractList' \
 -H 'Accept: application/json, text/plain, _/_' \
 -H 'Accept-Language: en-US,en;q=0.9,es-DO;q=0.8,es;q=0.7,de;q=0.6' \
 -H 'Authorization: Bearer \_ajerSdkgDlwNvvPSFjJBc8QA8gvugOAPeYrOD-Udn97RPehm0nuhkUkrVCoo9coOw5sZZ7Dyxb2MrirWUuJ5krEFncqyejQPoabFo5wYdYSCpaH0uyiflRdZZVhVEj5HJ6ruM12vfMXHjCWd3cbxaCcxM2iEcbAxc3jY1Kv-1icuwCfhO511hsJ-xV1qOevo-5o6Idui_De4OwCIZg1cvcV_lYMl140ZUPixNsq84bqoWDqVADb3zi7t0QrB1kRR2gIDmlPZ9Yi-EwmGIGjTsjGZetGnQApT8IxTt7JM7l2r61TOEYsM_F_muQvLgPrYpQRR2TacpOORVTjR1jB7A' \
 -H 'Connection: keep-alive' \
 -H 'Content-Type: application/json' \
 -H 'DNT: 1' \
 -H 'Origin: https://ov.edesur.com.do' \
 -H 'Referer: https://ov.edesur.com.do/profile' \
 -H 'Sec-Fetch-Dest: empty' \
 -H 'Sec-Fetch-Mode: cors' \
 -H 'Sec-Fetch-Site: same-site' \
 -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
 -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
 -H 'sec-ch-ua-mobile: ?0' \
 -H 'sec-ch-ua-platform: "macOS"'

# Generate URL for consumption

curl 'https://ovapi.edesur.com.do/ovapi/Consuption/GenerarURL?FechaReporte=15/07/2024&NIC=7405433' \
 -H 'Accept: application/json, text/plain, _/_' \
 -H 'Accept-Language: en-US,en;q=0.9,es-DO;q=0.8,es;q=0.7,de;q=0.6' \
 -H 'Authorization: Bearer \_ajerSdkgDlwNvvPSFjJBc8QA8gvugOAPeYrOD-Udn97RPehm0nuhkUkrVCoo9coOw5sZZ7Dyxb2MrirWUuJ5krEFncqyejQPoabFo5wYdYSCpaH0uyiflRdZZVhVEj5HJ6ruM12vfMXHjCWd3cbxaCcxM2iEcbAxc3jY1Kv-1icuwCfhO511hsJ-xV1qOevo-5o6Idui_De4OwCIZg1cvcV_lYMl140ZUPixNsq84bqoWDqVADb3zi7t0QrB1kRR2gIDmlPZ9Yi-EwmGIGjTsjGZetGnQApT8IxTt7JM7l2r61TOEYsM_F_muQvLgPrYpQRR2TacpOORVTjR1jB7A' \
 -H 'Connection: keep-alive' \
 -H 'Content-Type: application/json' \
 -H 'DNT: 1' \
 -H 'Origin: https://ov.edesur.com.do' \
 -H 'Referer: https://ov.edesur.com.do/consulta-de-consumo' \
 -H 'Sec-Fetch-Dest: empty' \
 -H 'Sec-Fetch-Mode: cors' \
 -H 'Sec-Fetch-Site: same-site' \
 -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
 -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
 -H 'sec-ch-ua-mobile: ?0' \
 -H 'sec-ch-ua-platform: "macOS"'

# Get consumption data

curl 'https://ov.edesur.com.do:8443/teleconsumos/GetDataTeleconsumoHash?hash=cXVja3VnbTdCcElmNGZOK1FvaFRJWkZhL3FYdk9kTEQ' \
 -H 'accept: application/json, text/plain, _/_' \
 -H 'accept-language: en-US,en;q=0.9,es-DO;q=0.8,es;q=0.7,de;q=0.6' \
 -H 'dnt: 1' \
 -H 'origin: https://ov.edesur.com.do' \
 -H 'priority: u=1, i' \
 -H 'referer: https://ov.edesur.com.do/Teleconsumo/?cXVja3VnbTdCcElmNGZOK1FvaFRJWkZhL3FYdk9kTEQ' \
 -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
 -H 'sec-ch-ua-mobile: ?0' \
 -H 'sec-ch-ua-platform: "macOS"' \
 -H 'sec-fetch-dest: empty' \
 -H 'sec-fetch-mode: cors' \
 -H 'sec-fetch-site: same-site' \
 -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
