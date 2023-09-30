# sms-active
This library provides the following features

- Sms active api allows you to get a number with the api and get the status of whether the verification code has arrived.
- If we don't have the type of number you want in stock, it waits until it arrives and returns the number information to you when you buy a number.
- You don't need to constantly check if you have received a verification code. It contains a function that checks the status until the verification code arrives and returns the code when it arrives.
- It allows you to cancel a number you have received, confirm that you have received the code, and receive another code for the same number for free.
- You can read your account balance.

```bash
npm i node-sms-active
```


### Buying a new number

```js
const smsActive = require("node-sms-active");

smsActive.buyNumber({
    country: 6, // See the bottom of the documentation for the country list.
    service: 'dr', // See the bottom of the documentation for the service list.
    operator: 'any',
    apiKey: '',
    verification: false
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**country:** The number of sms active in the country where the number will be received. To find the country you are looking for, see the country codes at the bottom of the page.

**service:** The sms active short code of the service to receive the number. To find the service you are looking for, see the service codes at the bottom of the page.

**operator:** You can use it if you want to get a number from a private operator in your country. It is not mandatory to send it. Default any

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**verification:** Default false. Sending is not mandatory. If true, a number that supports the call will be received.


<details>
<summary>Sample Successful Response</summary>

```js
{
  status: true,
  data: {
    activationId: '1779177117',
    phoneNumber: '628973921615',
    activationCost: '4.50',
    countryCode: '6',
    canGetAnotherSms: true,
    activationTime: '2023-09-30 02:36:18',
    activationOperator: 'three'
  }
}
```

</details>


<details>
<summary>Sample Failed Response</summary>

```js
{ 
    status: false, 
    data: 'WRONG_COUNTRY' 
}
```
</details>



### Check if the Sms Code has arrived and receive it if so

```js
const smsActive = require("node-sms-active");

smsActive.getCode({
    activationId: '',
    apiKey: '',
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**activationId:**  When you buy the number, you need to send the value returned to you in json.

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: '396989' 
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{ 
    status: false, 
    data: 'STATUS_WAIT_CODE' 
}
```
</details>


### Attempts to purchase until the number matching your requirements is in stock


```js
const smsActive = require("node-sms-active");

smsActive.waitForBuyNumber({
    country: 6, // See the bottom of the documentation for the country list.
    service: 'dr', // See the bottom of the documentation for the service list.
    operator: 'any',
    apiKey: '',
    verification: false,
    timeOut: 0
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**country:** The number of sms active in the country where the number will be received. To find the country you are looking for, see the country codes at the bottom of the page.

**service:** The sms active short code of the service to receive the number. To find the service you are looking for, see the service codes at the bottom of the page.

**operator:** You can use it if you want to get a number from a private operator in your country. It is not mandatory to send it. Default any

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**verification:** Default false. Sending is not mandatory. If true, a number that supports the call will be received.

**timeOut:** 0 Wait indefinitely if sent. If sent in milliseconds, it will return the status when the time expires. 1 Second = 1000 Milliseconds

<details>
<summary>Sample Successful Response</summary>

```js
{
  status: true,
  data: {
    activationId: '1779177117',
    phoneNumber: '628973921615',
    activationCost: '4.50',
    countryCode: '6',
    canGetAnotherSms: true,
    activationTime: '2023-09-30 02:36:18',
    activationOperator: 'three'
  }
}
```

</details>


<details>
<summary>Sample Failed Response</summary>

```js
{ 
    status: false, 
    data: 'WRONG_COUNTRY' 
}
```
</details>


### Attempts purchase until sms confirmation code arrives


```js
const smsActive = require("node-sms-active");

smsActive.waitForCode({
    activationId: '',
    apiKey: '',
    timeOut: 0
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**activationId:**  When you buy the number, you need to send the value returned to you in json.

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**timeOut:** 0 Wait indefinitely if sent. If sent in milliseconds, it will return the status when the time expires. 1 Second = 1000 Milliseconds

<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: '396989' 
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{ 
    status: false, 
    data: 'STATUS_WAIT_CODE' 
}
```
</details>


### Change the status of the order


```js
const smsActive = require("node-sms-active");

smsActive.setStatusActivation({
    activationId: '',
    apiKey: '',
    status: 8
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**activationId:**  When you buy the number, you need to send the value returned to you in json.

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**status:** Can only take values 1, 3, 6, 8

1 inform about the readiness of the number (SMS sent to the number)

3 request another code (free)

6 complete activation *

8 inform that the number has been used and cancel the activation


<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: 'ACCESS_CANCEL' 
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{
  status: false,
  data: 'EARLY_CANCEL_DENIED - You can‘t cancel the number within the first 2 minutes'
}
```
</details>





### Get account balance


```js
const smsActive = require("node-sms-active");

smsActive.getBallance({
    apiKey: '',
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: 498.28
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{
  status: false,
  data: 'ERROR_SQL'
}
```
</details>

### Country Code List


| Number | Country              | Title                                      |
|--------|----------------------|--------------------------------------------|
| 0      | Russia               | ![Russia](https://sms-activate.org/assets/ico/country/0.png)                 |
| 1      | Ukraine              | ![Ukraine](https://sms-activate.org/assets/ico/country/1.png)                |
| 2      | Kazakhstan           | ![Kazakhstan](https://sms-activate.org/assets/ico/country/2.png)             |
| 3      | China                | ![China](https://sms-activate.org/assets/ico/country/3.png)                  |
| 4      | Philippines          | ![Philippines](https://sms-activate.org/assets/ico/country/4.png)            |
| 5      | Myanmar              | ![Myanmar](https://sms-activate.org/assets/ico/country/5.png)                |
| 6      | Indonesia            | ![Indonesia](https://sms-activate.org/assets/ico/country/6.png)              |
| 7      | Malaysia             | ![Malaysia](https://sms-activate.org/assets/ico/country/7.png)               |
| 8      | Kenya                | ![Kenya](https://sms-activate.org/assets/ico/country/8.png)                  |
| 9      | Tanzania             | ![Tanzania](https://sms-activate.org/assets/ico/country/9.png)               |
| 10     | Vietnam              | ![Vietnam](https://sms-activate.org/assets/ico/country/10.png)               |
| 11     | Kyrgyzstan           | ![Kyrgyzstan](https://sms-activate.org/assets/ico/country/11.png)            |
| 12     | USA (virtual)        | ![USA (virtual)](https://sms-activate.org/assets/ico/country/12.png)         |
| 13     | Israel               | ![Israel](https://sms-activate.org/assets/ico/country/13.png)                |
| 14     | HongKong             | ![HongKong](https://sms-activate.org/assets/ico/country/14.png)              |
| 15     | Poland               | ![Poland](https://sms-activate.org/assets/ico/country/15.png)                |
| 16     | England              | ![England](https://sms-activate.org/assets/ico/country/16.png)               |
| 17     | Madagascar           | ![Madagascar](https://sms-activate.org/assets/ico/country/17.png)            |
| 18     | DCongo               | ![DCongo](https://sms-activate.org/assets/ico/country/18.png)                |
| 19     | Nigeria              | ![Nigeria](https://sms-activate.org/assets/ico/country/19.png)               |
| 20     | Macao                | ![Macao](https://sms-activate.org/assets/ico/country/20.png)                 |
| 21     | Egypt                | ![Egypt](https://sms-activate.org/assets/ico/country/21.png)                 |
| 22     | India                | ![India](https://sms-activate.org/assets/ico/country/22.png)                 |
| 23     | Ireland              | ![Ireland](https://sms-activate.org/assets/ico/country/23.png)               |
| 24     | Cambodia             | ![Cambodia](https://sms-activate.org/assets/ico/country/24.png)              |
| 25     | Laos                 | ![Laos](https://sms-activate.org/assets/ico/country/25.png)                  |
| 26     | Haiti                | ![Haiti](https://sms-activate.org/assets/ico/country/26.png)                 |
| 27     | Ivory                | ![Ivory](https://sms-activate.org/assets/ico/country/27.png)                 |
| 28     | Gambia               | ![Gambia](https://sms-activate.org/assets/ico/country/28.png)                |
| 29     | Serbia               | ![Serbia](https://sms-activate.org/assets/ico/country/29.png)                |
| 30     | Yemen                | ![Yemen](https://sms-activate.org/assets/ico/country/30.png)                 |
| 31     | Southafrica          | ![Southafrica](https://sms-activate.org/assets/ico/country/31.png)           |
| 32     | Romania              | ![Romania](https://sms-activate.org/assets/ico/country/32.png)               |
| 33     | Colombia             | ![Colombia](https://sms-activate.org/assets/ico/country/33.png)              |
| 34     | Estonia              | ![Estonia](https://sms-activate.org/assets/ico/country/34.png)               |
| 35     | Azerbaijan           | ![Azerbaijan](https://sms-activate.org/assets/ico/country/35.png)            |
| 36     | Canada               | ![Canada](https://sms-activate.org/assets/ico/country/36.png)                |
| 37     | Morocco              | ![Morocco](https://sms-activate.org/assets/ico/country/37.png)               |
| 38     | Ghana                | ![Ghana](https://sms-activate.org/assets/ico/country/38.png)                 |
| 39     | Argentina            | ![Argentina](https://sms-activate.org/assets/ico/country/39.png)             |
| 40     | Uzbekistan           | ![Uzbekistan](https://sms-activate.org/assets/ico/country/40.png)            |
| 41     | Cameroon             | ![Cameroon](https://sms-activate.org/assets/ico/country/41.png)              |
| 42     | Chad                 | ![Chad](https://sms-activate.org/assets/ico/country/42.png)                  |
| 43     | Germany              | ![Germany](https://sms-activate.org/assets/ico/country/43.png)               |
| 44     | Lithuania           | ![Lithuania](https://sms-activate.org/assets/ico/country/44.png)            |
| 45     | Croatia              | ![Croatia](https://sms-activate.org/assets/ico/country/45.png)               |
| 46     | Sweden               | ![Sweden](https://sms-activate.org/assets/ico/country/46.png)                |
| 47     | Iraq                 | ![Iraq](https://sms-activate.org/assets/ico/country/47.png)                  |
| 48     | Netherlands          | ![Netherlands](https://sms-activate.org/assets/ico/country/48.png)           |
| 49     | Latvia               | ![Latvia](https://sms-activate.org/assets/ico/country/49.png)                |
| 50     | Austria              | ![Austria](https://sms-activate.org/assets/ico/country/50.png)               |
| 51     | Belarus              | ![Belarus](https://sms-activate.org/assets/ico/country/51.png)               |
| 52     | Thailand             | ![Thailand](https://sms-activate.org/assets/ico/country/52.png)              |
| 53     | Saudiarabia          | ![Saudiarabia](https://sms-activate.org/assets/ico/country/53.png)           |
| 54     | Mexico               | ![Mexico](https://sms-activate.org/assets/ico/country/54.png)                |
| 55     | Taiwan               | ![Taiwan](https://sms-activate.org/assets/ico/country/55.png)                |
| 56     | Spain                | ![Spain](https://sms-activate.org/assets/ico/country/56.png)                 |
| 57     | Iran                 | ![Iran](https://sms-activate.org/assets/ico/country/57.png)                  |
| 58     | Algeria              | ![Algeria](https://sms-activate.org/assets/ico/country/58.png)               |
| 59     | Slovenia             | ![Slovenia](https://sms-activate.org/assets/ico/country/59.png)              |
| 60     | Bangladesh           | ![Bangladesh](https://sms-activate.org/assets/ico/country/60.png)            |
| 61     | Senegal              | ![Senegal](https://sms-activate.org/assets/ico/country/61.png)               |
| 62     | Turkey               | ![Turkey](https://sms-activate.org/assets/ico/country/62.png)                |
| 63     | Czech                | ![Czech](https://sms-activate.org/assets/ico/country/63.png)                 |
| 64     | Srilanka             | ![Srilanka](https://sms-activate.org/assets/ico/country/64.png)              |
| 65     | Peru                 | ![Peru](https://sms-activate.org/assets/ico/country/65.png)                  |
| 66     | Pakistan             | ![Pakistan](https://sms-activate.org/assets/ico/country/66.png)              |
| 67     | Newzealand           | ![Newzealand](https://sms-activate.org/assets/ico/country/67.png)            |
| 68     | Guinea               | ![Guinea](https://sms-activate.org/assets/ico/country/68.png)                |
| 69     | Mali                 | ![Mali](https://sms-activate.org/assets/ico/country/69.png)                  |
| 70     | Venezuela            | ![Venezuela](https://sms-activate.org/assets/ico/country/70.png)             |
| 71     | Ethiopia             | ![Ethiopia](https://sms-activate.org/assets/ico/country/71.png)              |
| 72     | Mongolia             | ![Mongolia](https://sms-activate.org/assets/ico/country/72.png)              |
| 73     | Brazil               | ![Brazil](https://sms-activate.org/assets/ico/country/73.png)                |
| 74     | Afghanistan          | ![Afghanistan](https://sms-activate.org/assets/ico/country/74.png)           |
| 75     | Uganda               | ![Uganda](https://sms-activate.org/assets/ico/country/75.png)                |
| 76     | Angola               | ![Angola](https://sms-activate.org/assets/ico/country/76.png)                |
| 77     | Cyprus               | ![Cyprus](https://sms-activate.org/assets/ico/country/77.png)                |
| 78     | France               | ![France](https://sms-activate.org/assets/ico/country/78.png)                |
| 79     | Papua                | ![Papua](https://sms-activate.org/assets/ico/country/79.png)                 |
| 80     | Mozambique           | ![Mozambique](https://sms-activate.org/assets/ico/country/80.png)            |
| 81     | Nepal                | ![Nepal](https://sms-activate.org/assets/ico/country/81.png)                 |
| 82     | Belgium              | ![Belgium](https://sms-activate.org/assets/ico/country/82.png)               |
| 83     | Bulgaria             | ![Bulgaria](https://sms-activate.org/assets/ico/country/83.png)              |
| 84     | Hungary              | ![Hungary](https://sms-activate.org/assets/ico/country/84.png)               |
| 85     | Moldova              | ![Moldova](https://sms-activate.org/assets/ico/country/85.png)               |
| 86     | Italy                | ![Italy](https://sms-activate.org/assets/ico/country/86.png)                 |
| 87     | Paraguay             | ![Paraguay](https://sms-activate.org/assets/ico/country/87.png)              |
| 88     | Honduras             | ![Honduras](https://sms-activate.org/assets/ico/country/88.png)              |
| 89     | Tunisia              | ![Tunisia](https://sms-activate.org/assets/ico/country/89.png)               |
| 90     | Nicaragua            | ![Nicaragua](https://sms-activate.org/assets/ico/country/90.png)             |
| 91     | Timorleste           | ![Timorleste](https://sms-activate.org/assets/ico/country/91.png)            |
| 92     | Bolivia              | ![Bolivia](https://sms-activate.org/assets/ico/country/92.png)               |
| 93     | Costarica            | ![Costarica](https://sms-activate.org/assets/ico/country/93.png)             |
| 94     | Guatemala            | ![Guatemala](https://sms-activate.org/assets/ico/country/94.png)             |
| 95     | Uae                  | ![Uae](https://sms-activate.org/assets/ico/country/95.png)                   |
| 96     | Zimbabwe             | ![Zimbabwe](https://sms-activate.org/assets/ico/country/96.png)              |
| 97     | Puertorico           | ![Puertorico](https://sms-activate.org/assets/ico/country/97.png)            |
| 98     | Sudan                | ![Sudan](https://sms-activate.org/assets/ico/country/98.png)                 |
| 99     | Togo                 | ![Togo](https://sms-activate.org/assets/ico/country/99.png)                  |
| 100    | Kuwait               | ![Kuwait](https://sms-activate.org/assets/ico/country/100.png)               |
| 101    | Salvador             | ![Salvador](https://sms-activate.org/assets/ico/country/101.png)             |
| 102    | Libyan               | ![Libyan](https://sms-activate.org/assets/ico/country/102.png)               |
| 103    | Jamaica              | ![Jamaica](https://sms-activate.org/assets/ico/country/103.png)              |
| 104    | Trinidad             | ![Trinidad](https://sms-activate.org/assets/ico/country/104.png)             |
| 105    | Ecuador              | ![Ecuador](https://sms-activate.org/assets/ico/country/105.png)              |
| 106    | Swaziland            | ![Swaziland](https://sms-activate.org/assets/ico/country/106.png)            |
| 107    | Oman                 | ![Oman](https://sms-activate.org/assets/ico/country/107.png)                 |
| 108    | Bosnia               | ![Bosnia](https://sms-activate.org/assets/ico/country/108.png)                |
| 109    | Dominican            | ![Dominican](https://sms-activate.org/assets/ico/country/109.png)             |
| 110    | Syrian               | ![Syrian](https://sms-activate.org/assets/ico/country/110.png)               |
| 111    | Qatar                | ![Qatar](https://sms-activate.org/assets/ico/country/111.png)                |
| 112    | Panama               | ![Panama](https://sms-activate.org/assets/ico/country/112.png)               |
| 113    | Cuba                 | ![Cuba](https://sms-activate.org/assets/ico/country/113.png)                 |
| 114    | Mauritania           | ![Mauritania](https://sms-activate.org/assets/ico/country/114.png)           |
| 115    | Sierraleone          | ![Sierraleone](https://sms-activate.org/assets/ico/country/115.png)          |
| 116    | Jordan               | ![Jordan](https://sms-activate.org/assets/ico/country/116.png)               |
| 117    | Portugal             | ![Portugal](https://sms-activate.org/assets/ico/country/117.png)             |
| 118    | Barbados             | ![Barbados](https://sms-activate.org/assets/ico/country/118.png)             |
| 119    | Burundi              | ![Burundi](https://sms-activate.org/assets/ico/country/119.png)              |
| 120    | Benin                | ![Benin](https://sms-activate.org/assets/ico/country/120.png)                |
| 121    | Brunei               | ![Brunei](https://sms-activate.org/assets/ico/country/121.png)               |
| 122    | Bahamas              | ![Bahamas](https://sms-activate.org/assets/ico/country/122.png)              |
| 123    | Botswana             | ![Botswana](https://sms-activate.org/assets/ico/country/123.png)             |
| 124    | Belize               | ![Belize](https://sms-activate.org/assets/ico/country/124.png)               |
| 125    | Caf                  | ![Caf](https://sms-activate.org/assets/ico/country/125.png)                  |
| 126    | Dominica             | ![Dominica](https://sms-activate.org/assets/ico/country/126.png)             |
| 127    | Grenada              | ![Grenada](https://sms-activate.org/assets/ico/country/127.png)              |
| 128    | Georgia              | ![Georgia](https://sms-activate.org/assets/ico/country/128.png)              |
| 129    | Greece               | ![Greece](https://sms-activate.org/assets/ico/country/129.png)               |
| 130    | Guineabissau         | ![Guineabissau](https://sms-activate.org/assets/ico/country/130.png)         |
| 131    | Guyana               | ![Guyana](https://sms-activate.org/assets/ico/country/131.png)               |
| 132    | Iceland              | ![Iceland](https://sms-activate.org/assets/ico/country/132.png)              |
| 133    | Comoros              | ![Comoros](https://sms-activate.org/assets/ico/country/133.png)              |
| 134    | Saintkitts           | ![Saintkitts](https://sms-activate.org/assets/ico/country/134.png)           |
| 135    | Liberia              | ![Liberia](https://sms-activate.org/assets/ico/country/135.png)              |
| 136    | Lesotho              | ![Lesotho](https://sms-activate.org/assets/ico/country/136.png)              |
| 137    | Malawi               | ![Malawi](https://sms-activate.org/assets/ico/country/137.png)               |
| 138    | Namibia              | ![Namibia](https://sms-activate.org/assets/ico/country/138.png)              |
| 139    | Niger                | ![Niger](https://sms-activate.org/assets/ico/country/139.png)                |
| 140    | Rwanda               | ![Rwanda](https://sms-activate.org/assets/ico/country/140.png)               |
| 141    | Slovakia             | ![Slovakia](https://sms-activate.org/assets/ico/country/141.png)             |
| 142    | Suriname             | ![Suriname](https://sms-activate.org/assets/ico/country/142.png)             |
| 143    | Tajikistan           | ![Tajikistan](https://sms-activate.org/assets/ico/country/143.png)           |
| 144    | Monaco               | ![Monaco](https://sms-activate.org/assets/ico/country/144.png)               |
| 145    | Bahrain              | ![Bahrain](https://sms-activate.org/assets/ico/country/145.png)              |
| 146    | Reunion              | ![Reunion](https://sms-activate.org/assets/ico/country/146.png)              |
| 147    | Zambia               | ![Zambia](https://sms-activate.org/assets/ico/country/147.png)               |
| 148    | Armenia              | ![Armenia](https://sms-activate.org/assets/ico/country/148.png)              |
| 149    | Somalia              | ![Somalia](https://sms-activate.org/assets/ico/country/149.png)              |
| 150    | Congo                | ![Congo](https://sms-activate.org/assets/ico/country/150.png)                |
| 151    | Chile                | ![Chile](https://sms-activate.org/assets/ico/country/151.png)                |
| 152    | Burkinafaso          | ![Burkinafaso](https://sms-activate.org/assets/ico/country/152.png)          |
| 153    | Lebanon              | ![Lebanon](https://sms-activate.org/assets/ico/country/153.png)              |
| 154    | Gabon                | ![Gabon](https://sms-activate.org/assets/ico/country/154.png)                |
| 155    | Albania              | ![Albania](https://sms-activate.org/assets/ico/country/155.png)              |
| 156    | Uruguay              | ![Uruguay](https://sms-activate.org/assets/ico/country/156.png)              |
| 157    | Mauritius            | ![Mauritius](https://sms-activate.org/assets/ico/country/157.png)            |
| 158    | Bhutan               | ![Bhutan](https://sms-activate.org/assets/ico/country/158.png)               |
| 159    | Maldives             | ![Maldives](https://sms-activate.org/assets/ico/country/159.png)             |
| 160    | Guadeloupe           | ![Guadeloupe](https://sms-activate.org/assets/ico/country/160.png)           |
| 161    | Turkmenistan         | ![Turkmenistan](https://sms-activate.org/assets/ico/country/161.png)         |
| 162    | Frenchguiana         | ![Frenchguiana](https://sms-activate.org/assets/ico/country/162.png)         |
| 163    | Finland              | ![Finland](https://sms-activate.org/assets/ico/country/163.png)              |
| 164    | Saintlucia           | ![Saintlucia](https://sms-activate.org/assets/ico/country/164.png)           |
| 165    | Luxembourg           | ![Luxembourg](https://sms-activate.org/assets/ico/country/165.png)           |
| 166    | Saintvincentgrenadines| ![Saintvincentgrenadines](https://sms-activate.org/assets/ico/country/166.png)|
| 167    | Equatorialguinea     | ![Equatorialguinea](https://sms-activate.org/assets/ico/country/167.png)     |
| 168    | Djibouti             | ![Djibouti](https://sms-activate.org/assets/ico/country/168.png)             |
| 169    | Antiguabarbuda       | ![Antiguabarbuda](https://sms-activate.org/assets/ico/country/169.png)       |
| 170    | Caymanislands        | ![Caymanislands](https://sms-activate.org/assets/ico/country/170.png)        |
| 171    | Montenegro           | ![Montenegro](https://sms-activate.org/assets/ico/country/171.png)           |
| 172    | Denmark              | ![Denmark](https://sms-activate.org/assets/ico/country/172.png)              |
| 173    | Switzerland          | ![Switzerland](https://sms-activate.org/assets/ico/country/173.png)          |
| 174    | Norway               | ![Norway](https://sms-activate.org/assets/ico/country/174.png)               |
| 175    | Australia            | ![Australia](https://sms-activate.org/assets/ico/country/175.png)            |
| 176    | Eritrea              | ![Eritrea](https://sms-activate.org/assets/ico/country/176.png)              |
| 177    | Southsudan           | ![Southsudan](https://sms-activate.org/assets/ico/country/177.png)           |
| 178    | Saotomeandprincipe   | ![Saotomeandprincipe](https://sms-activate.org/assets/ico/country/178.png)   |
| 179    | Aruba                | ![Aruba](https://sms-activate.org/assets/ico/country/179.png)                |
| 180    | Montserrat           | ![Montserrat](https://sms-activate.org/assets/ico/country/180.png)           |
| 181    | Anguilla             | ![Anguilla](https://sms-activate.org/assets/ico/country/181.png)             |
| 183    | Northmacedonia       | ![Northmacedonia](https://sms-activate.org/assets/ico/country/183.png)       |
| 184    | Seychelles           | ![Seychelles](https://sms-activate.org/assets/ico/country/184.png)           |
| 185    | Newcaledonia         | ![Newcaledonia](https://sms-activate.org/assets/ico/country/185.png)         |
| 186    | Capeverde            | ![Capeverde](https://sms-activate.org/assets/ico/country/186.png)            |
| 187    | USA                  | ![USA](https://sms-activate.org/assets/ico/country/187.png)                 |
| 189    | Fiji                 | ![Fiji](https://sms-activate.org/assets/ico/country/189.png)                 |
| 196    | Singapore            | ![Singapore](https://sms-activate.org/assets/ico/country/196.png)            |
| 201    | Gibraltar            | ![Gibraltar](https://sms-activate.org/assets/ico/country/201.png)            |



### Service List


| Service Code | Name               |
|--------------|--------------------|
| full         | Full Rent          |
| full         | Full rent          |
| tg           | Telegram           |
| ig           | Instagram+Threads  |
| wa           | Whatsapp           |
| fb           | Facebook           |
| go           | Google,youtube,Gmail|
| tw           | Twitter            |
| mm           | Microsoft          |
| hw           | Alipay/Alibaba/1688 |
| am           | Amazon             |
| oi           | Tinder             |
| ma           | Mail.ru            |
| ds           | Discord            |
| mt           | Steam              |
| ju           | Indomaret          |
| lf           | TikTok/Douyin      |
| me           | Line messenger     |
| ot           | Any other call forwarding |
| ot           | Any other           |
| of           | urent/jet/RuSharing|
| da           | MTS CashBack        |
| nv           | Naver              |
| dr           | OpenAI             |
| tn           | LinkedIn           |
| vk           | vk.com             |
| ew           | Nike               |
| mb           | Yahoo              |
| ya           | Yandex             |
| ya           | Yandex call forwarding |
| dh           | eBay               |
| pm           | AOL                |
| vs           | WinzoGame          |
| ts           | PayPal             |
| dl           | Lazada             |
| ok           | ok.ru              |
| ka           | Shopee             |
| av           | avito              |
| av           | avito call forwarding |
| nz           | Foodpanda          |
| ub           | Uber               |
| ki           | 99app              |
| uu           | Wildberries        |
| wb           | WeChat             |
| yw           | Grindr             |
| acz          | Claude             |
| bw           | Signal             |
| vi           | Viber              |
| xd           | Tokopedia          |
| kt           | KakaoTalk          |
| fw           | 99acres            |
| sn           | OLX                |
| kc           | Vinted             |
| be           | СберМегаМаркет     |
| ft           | Букмекерские       |
| pf           | pof.com            |
| qf           | RedBook            |
| ll           | 888casino          |
| wx           | Apple              |
| yl           | Yalla              |
| mj           | Zalo               |
| fu           | Snapchat           |
| xk           | DiDi               |
| pd           | IFood              |
| ni           | Gojek              |
| xh           | OVO                |
| vm           | OkCupid            |
| fr           | Dana               |
| xj           | СберМаркет         |
| df           | Happn              |
| cy           | РСА                |
| bc           | GCash              |
| jg           | Grab               |
| mv           | Fruitz             |
| tk           | МВидео             |
| im           | Imo                |
| pc           | Casino/bet/gambling|
| gf           | GoogleVoice         |
| sg           | OZON               |
| act          | Maxis              |
| ly           | Olacabs            |
| vz           | Hinge              |
| nf           | Netflix            |
| cq           | Mercado             |
| mo           | Bumble             |
| yy           | Venmo              |
| bz           | Blizzard           |
| vr           | MotorkuX           |
| uk           | Airbnb             |
| fx           | PGbonus call forwarding |
| fx           | PGbonus            |
| bv           | Metro              |
| do           | Leboncoin          |
| cb           | Bazos              |
| zp           | Pinduoduo          |
| wh           | TanTan             |
| ac           | DoorDash           |
| ev           | Picpay             |
| ado          | SmartyPig          |
| gx           | Hepsiburadacom     |
| kf           | Weibo              |
| tx           | Bolt               |
| acp          | BonusLink          |
| qq           | Tencent QQ         |
| rr           | Wolt               |
| cp           | Uklon              |
| aav          | Alchemy            |
| yr           | Miravia            |
| ie           | bet365             |
| acy          | Airtime            |
| fo           | MobiKwik           |
| ep           | Temu               |
| ns           | Oldubil            |
| em           | ZéDelivery         |
| zk           | Deliveroo          |
| dt           | Delivery Club      |
| acb          | Spark Driver       |
| et           | Clubhouse          |
| tu           | Lyft               |
| ah           | EscapeFromTarkov   |
| gp           | Ticketmaster       |
| ad           | Iti                |
| xq           | MPL                |
| abx          | Kaching            |
| abk          | GMX                |
| ze           | Shpock             |
| pu           | Justdating         |
| ada          | TRUTH SOCIAL       |
| ke           | Эльдорадо          |
| zb           | FreeNow            |
| gj           | Carousell          |
| ib           | Immowelt           |
| qv           | Badoo              |
| ls           | Careem             |
| hu           | Ukrnet             |
| fd           | Mamba              |
| zu           | BigC               |
| hs           | Asda               |
| fk           | BLIBLI             |
| aaa          | Nubank             |
| rd           | Lenta              |
| yu           | Xiaomi             |
| ua           | BlaBlaCar          |
| xy           | Depop              |
| ym           | youla.ru call forwarding |
| ym           | youla.ru           |
| bn           | Alfagift           |
| kj           | YAPPY              |
| nc           | Payoneer           |
| xm           | Лэтуаль            |
| jr           | Самокат            |
| mg           | Magnit             |
| nt           | Sravni             |
| abq          | Upwork             |
| abt          | ArenaPlus          |
| kl           | kolesa.kz          |
| ge           | Paytm              |
| wv           | AIS                |
| aec          | JinJiang           |
| zs           | Bilibili           |
| lx           | DewuPoison         |
| ae           | myGLO              |
| acc          | LuckyLand Slots    |
| za           | JDcom              |
| yk           | СпортМастер        |
| gu           | Fora               |
| adc          | PlayOJO            |
| hx           | AliExpress         |
| vd           | Betfair            |
| zh           | Zoho               |
| zo           | Kaggle             |
| bd           | X5ID               |
| mx           | SoulApp            |
| ov           | Beget              |
| lj           | Santander          |
| qz           | Faceit             |
| gq           | Freelancer         |
| bl           | BIGO LIVE          |
| bm           | MarketGuru         |
| vg           | ShellBox           |
| fz           | KFC                |
| ff           | AVON               |
| rl           | inDriver           |
| lc           | Subito             |
| bo           | Wise               |
| at           | Perfluence         |
| jx           | Swiggy             |
| abl          | gpnbonus           |
| io           | ЗдравСити          |
| wc           | Craigslist         |
| ue           | Onet               |
| km           | Rozetka            |
| gr           | Astropay           |
| jl           | Hopi               |
| cm           | Prom               |
| ex           | Linode             |
| tl           | Truecaller         |
| ps           | Zdorov             |
| rt           | hily               |
| acn          | Radium             |
| xu           | RecargaPay         |
| jq           | Paysafecard        |
| gk           | AptekaRU           |
| ng           | FunPay             |
| acj          | Meituan            |
| li           | Baidu              |
| mi           | Zupee              |
| rn           | neftm              |
| abc          | Taptap Send        |
| cn           | Fiverr             |
| ta           | Wink               |
| sh           | Vkusvill           |
| sm           | YoWin              |
| qy           | Zhihu              |
| hb           | Twitch             |
| kx           | Vivo               |
| nl           | Myntra             |
| vp           | Kwai               |
| abn          | Namars             |
| dp           | ProtonMail         |
| re           | Coinbase           |
| gi           | Hotline            |
| rc           | Skype              |
| ys           | ZCity              |
| yj           | eWallet            |
| co           | Rediffmail         |
| ye           | ZaleyCash          |
| yx           | JTExpress          |
| th           | WestStein          |
| vy           | Meta               |
| cr           | TenChat            |
| bh           | Uteka              |
| ix           | Celcoin            |
| zm           | OfferUp            |
| hy           | Ininal             |
| ml           | ApostaGanha        |
| mz           | Zolushka           |
| hz           | Drom               |
| po           | premium.one        |
| bb           | LazyPay            |
| tz           | Лейка              |
| hp           | Meesho             |
| aau          | RockeTreach        |
| ip           | Burger King        |
| acw          | YouDo              |
| oj           | LoveRu             |
| aq           | Glovo              |
| wg           | Skout              |
| cj           | Dotz               |
| xt           | Flipkart           |
| rk           | Fotka              |
| fh           | Lalamove           |
| jv           | Consultant         |
| vc           | Banqi              |
| my           | CAIXA              |
| ky           | SpatenOktoberfest   |
| sd           | dodopizza          |
| ln           | Grofers            |
| kh           | Bukalapak          |
| zd           | Zilch              |
| ve           | Dream11            |
| xz           | paycell            |
| ul           | Getir              |
| aeb          | GoPayz             |
| oz           | Poshmark           |
| ao           | UU163              |
| wd           | CasinoPlus         |
| js           | GolosZa            |
| aba          | Rappi              |
| kk           | Idealista          |
| rj           | Детский мир        |
| adp          | Cabify             |
| uz           | OffGamers           |
| oe           | Codashop           |
| adr          | Boosty             |
| ck           | BeReal             |
| sr           | Starbucks          |
| il           | IQOS               |
| ady          | ТОКИО-CITY         |
| fj           | Potato Chat         |
| sy           | Brahma             |
| yi           | Yemeksepeti        |
| aby          | Couponscom         |
| ax           | CrefisaMais        |
| dn           | Paxful             |
| no           | Virgo              |
| wr           | Walmart            |
| ko           | AdaKami            |
| acs          | Tata CLiQ Palette  |
| rm           | Faberlic           |
| aaq          | Netease            |
| sz           | Pivko24            |
| jc           | IVI                |
| fa           | XadrezFeliz        |
| mc           | Michat             |
| ow           | RegRu              |
| an           | Adidas             |
| kq           | FotoCasa           |
| tm           | Akulaku            |
| gw           | CallApp            |
| fl           | RummyLoot          |
| jd           | GiraBank           |
| ld           | Cashmine           |
| adl          | EarnEasy           |
| kb           | kufarby            |
| abo          | WEBDE              |
| dd           | CloudChat          |
| ks           | Hirect             |
| lt           | BitClout           |
| zr           | Papara             |
| je           | Nanovest           |
| rf           | Akudo              |
| cg           | Gemgala            |
| vh           | Штолле             |
| sc           | Crypto             |
| xg           | Дзен               |
| ilr          | YANDEX             |
| uwc          | Odobrenie           |
| lsq          | Spoiler            |
| acf          | ShopeeMY           |
| syg          | JustDates          |
| tc           | AmazonML           |
| twm          | Solana             |
| kd           | IviNews            |
| ktp          | Divo               |
| lp           | CryptoMining       |
| dx           | CubeTV             |
| yuq          | CCB                |
| atq          | Авто2Ру            |
| adq          | ACMarket           |
| ijd          | INTENCITY          |
| lyd          | Birge              |
| adg          | иРНД                |
| iud          | AdGuard            |
| adw          | Wolt               |
| lyw          | Трк ГуляйПоле      |
| fp           | Buy+               |
| liq          | Limpkin            |
| fpq          | YouZik             |
| adk          | Однокласники        |
| abp          | Youzik             |
| kn           | KINOPOISK           |
| lxq          | Lmz                |
| fwq          | Новая почта        |
| ffq          | Тануки              |
| fq           | Розетка             |
| flq          | GuaiGuai            |
| fn           | Shopee              |
| fzq          | СмартьФинанс        |
| qfq          | Амедиа             |
| fqq          | BlockParty          |
| bf           | Olx                 |
| fqq          | Firestarter         |