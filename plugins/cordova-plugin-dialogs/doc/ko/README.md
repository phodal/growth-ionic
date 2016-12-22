<!--
# license: Licensed to the Apache Software Foundation (ASF) under one
#         or more contributor license agreements.  See the NOTICE file
#         distributed with this work for additional information
#         regarding copyright ownership.  The ASF licenses this file
#         to you under the Apache License, Version 2.0 (the
#         "License"); you may not use this file except in compliance
#         with the License.  You may obtain a copy of the License at
#
#           http://www.apache.org/licenses/LICENSE-2.0
#
#         Unless required by applicable law or agreed to in writing,
#         software distributed under the License is distributed on an
#         "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#         KIND, either express or implied.  See the License for the
#         specific language governing permissions and limitations
#         under the License.
-->

# cordova-plugin-dialogs

[![Build Status](https://travis-ci.org/apache/cordova-plugin-dialogs.svg)](https://travis-ci.org/apache/cordova-plugin-dialogs)

이 플러그인 글로벌 `navigator.notification` 개체를 통해 몇 가지 기본 대화 상자 UI 요소에 액세스할 수 있습니다.

개체 `navigator` 글로벌 범위 첨부 아니에요 때까지 사용할 수 있는 `deviceready` 이벤트 후.

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(navigator.notification);
    }
    

## 설치

    cordova plugin add cordova-plugin-dialogs
    

## 메서드

  * `navigator.notification.alert`
  * `navigator.notification.confirm`
  * `navigator.notification.prompt`
  * `navigator.notification.beep`

## navigator.notification.alert

사용자 지정 경고 또는 대화 상자를 보여 줍니다. 이 기능에 대 한 기본 대화 상자를 사용 하는 대부분의 코르도바 구현 하지만 일부 플랫폼은 일반적으로 덜 사용자 정의할 수 있는 브라우저의 `alert` 기능을 사용 합니다.

    navigator.notification.alert(message, alertCallback, [title], [buttonName])
    

  * **message**: 대화 메시지. *(문자열)*

  * **alertCallback**: 콜백을 호출할 때 경고 대화 기 각. *(기능)*

  * **title**: 제목 대화 상자. *(문자열)* (옵션, 기본값:`Alert`)

  * **buttonName**: 단추 이름. *(문자열)* (옵션, 기본값:`OK`)

### 예를 들어

    function alertDismissed() {
        // do something
    }
    
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
    

### 지원 되는 플랫폼

  * 아마존 화재 운영 체제
  * 안 드 로이드
  * 블랙베리 10
  * Firefox 운영 체제
  * iOS
  * Tizen
  * Windows Phone 7과 8
  * 윈도우 8
  * 윈도우

### Windows Phone 7, 8 특수

  * 아니 내장 브라우저 경고 하지만 다음과 같이 전화를 바인딩할 수 있습니다 `alert()` 전역 범위에서:
    
        window.alert = navigator.notification.alert;
        

  * 둘 다 `alert` 와 `confirm` 는 비차단 호출, 결과 비동기적으로 사용할 수 있습니다.

### 파이어 폭스 OS 단점:

기본 차단 `window.alert()` 및 차단 되지 않은 `navigator.notification.alert()` 사용할 수 있습니다.

### 블랙베리 10 단점

`navigator.notification.alert ('텍스트', 콜백, '제목', '텍스트')` 콜백 매개 변수 1 번을 전달 됩니다.

## navigator.notification.confirm

사용자 정의 확인 대화 상자가 표시 됩니다.

    navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])
    

  * **message**: 대화 메시지. *(문자열)*

  * **confirmCallback**: 인덱스 버튼 (1, 2 또는 3) 또는 대화 상자 버튼을 누르면 (0) 없이 기 각 될 때 호출할 콜백 합니다. *(기능)*

  * **title**: 제목 대화 상자. *(문자열)* (옵션, 기본값:`Confirm`)

  * **buttonLabels**: 단추 레이블을 지정 하는 문자열 배열입니다. *(배열)* (옵션, 기본값은 [ `OK,Cancel` ])

### confirmCallback

`confirmCallback`는 사용자가 확인 대화 상자에서 단추 중 하나를 누를 때 실행 합니다.

콜백이 걸립니다 인수 `buttonIndex` *(번호)를* 누르면된 버튼의 인덱스입니다. Note 인덱스에서는 인덱싱 1 시작 값은 `1`, `2`, `3`, 등등.

### 예를 들어

    function onConfirm(buttonIndex) {
        alert('You selected button ' + buttonIndex);
    }
    
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );
    

### 지원 되는 플랫폼

  * 아마존 화재 운영 체제
  * 안 드 로이드
  * 블랙베리 10
  * Firefox 운영 체제
  * iOS
  * Tizen
  * Windows Phone 7과 8
  * 윈도우 8
  * 윈도우

### Windows Phone 7, 8 특수

  * 에 대 한 기본 제공 브라우저 함수가 `window.confirm` , 그러나 할당 하 여 바인딩할 수 있습니다:
    
        window.confirm = navigator.notification.confirm;
        

  * 호출 `alert` 및 `confirm` 되므로 차단 되지 않은 결과만 비동기적으로 사용할 수 있습니다.

### 윈도우 특수

  * Windows8/8.1에 3 개 이상 단추 MessageDialog 인스턴스를 추가할 수는 없습니다.

  * Windows Phone 8.1에 두 개 이상의 단추와 대화 상자 표시 수는 없습니다.

### 파이어 폭스 OS 단점:

기본 차단 `window.confirm()` 및 차단 되지 않은 `navigator.notification.confirm()` 사용할 수 있습니다.

## navigator.notification.prompt

브라우저의 `프롬프트` 함수 보다 더 많은 사용자 정의 기본 대화 상자가 표시 됩니다.

    navigator.notification.prompt(message, promptCallback, [title], [buttonLabels], [defaultText])
    

  * **message**: 대화 메시지. *(문자열)*

  * **promptCallback**: 인덱스 버튼 (1, 2 또는 3) 또는 대화 상자 버튼을 누르면 (0) 없이 기 각 될 때 호출할 콜백 합니다. *(기능)*

  * **title**: 제목 대화 상자. *(문자열)* (옵션, 기본값:`Prompt`)

  * **buttonLabels**: 버튼 레이블 *(배열)* (옵션, 기본값 `["확인", "취소"]을` 지정 하는 문자열의 배열)

  * **defaultText**: 기본 텍스트 상자에 값 (`문자열`) 입력 (옵션, 기본값: 빈 문자열)

### promptCallback

`promptCallback`는 사용자가 프롬프트 대화 상자에서 단추 중 하나를 누를 때 실행 합니다. 콜백에 전달 된 `results` 개체에는 다음 속성이 포함 되어 있습니다.

  * **buttonIndex**: 눌려진된 버튼의 인덱스. *(수)* Note 인덱스에서는 인덱싱 1 시작 값은 `1`, `2`, `3`, 등등.

  * **input1**: 프롬프트 대화 상자에 입력 한 텍스트. *(문자열)*

### 예를 들어

    function onPrompt(results) {
        alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
    }
    
    navigator.notification.prompt(
        'Please enter your name',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit'],             // buttonLabels
        'Jane Doe'                 // defaultText
    );
    

### 지원 되는 플랫폼

  * 아마존 화재 운영 체제
  * 안 드 로이드
  * Firefox 운영 체제
  * iOS
  * Windows Phone 7과 8
  * 윈도우 8
  * 윈도우

### 안 드 로이드 단점

  * 안 드 로이드 최대 3 개의 단추를 지원 하 고 그것 보다는 더 이상 무시 합니다.

  * 안 드 로이드 3.0 및 나중에, 단추는 홀로 테마를 사용 하는 장치에 대 한 반대 순서로 표시 됩니다.

### 윈도우 특수

  * 윈도우에서 프롬프트 대화 같은 네이티브 api의 부족으로 인해 html 기반 이다.

### 파이어 폭스 OS 단점:

기본 차단 `window.prompt()` 및 차단 되지 않은 `navigator.notification.prompt()` 사용할 수 있습니다.

## navigator.notification.beep

장치는 경고음 소리를 재생 합니다.

    navigator.notification.beep(times);
    

  * **times**: 경고음을 반복 하는 횟수. *(수)*

### 예를 들어

    // Beep twice!
    navigator.notification.beep(2);
    

### 지원 되는 플랫폼

  * 아마존 화재 운영 체제
  * 안 드 로이드
  * 블랙베리 10
  * iOS
  * Tizen
  * Windows Phone 7과 8
  * 윈도우 8

### 아마존 화재 OS 단점

  * 아마존 화재 운영 체제 기본 **설정/디스플레이 및 사운드** 패널에 지정 된 **알림 소리** 재생 됩니다.

### 안 드 로이드 단점

  * 안 드 로이드 기본 **알림 벨소리** **설정/사운드 및 디스플레이** 패널에서 지정 합니다.

### Windows Phone 7, 8 특수

  * 코르 도우 바 분포에서 일반 경고음 파일에 의존합니다.

### Tizen 특수

  * Tizen은 미디어 API 통해 오디오 파일을 재생 하 여 경고음을 구현 합니다.

  * 경고음 파일 짧은 되어야 합니다, 응용 프로그램의 루트 디렉터리의 `소리` 하위 디렉터리에 위치 해야 합니다 및 `beep.wav`는 명명 된.