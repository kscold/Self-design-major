- 웹 페이지 레이아웃을 구성할 때 보통 width, height에 px라는 단위로 작성을 했었으나 화면 비율이 줄어듬에 따라 따로 설정해줘야하는 불편한점을 많이 해소시켜준다.

- vh : 화면(Screen)기준으로 높이를 뜻한다.  
- vw : 화면(Screen)기준으로 너비를 뜻한다.

- 현재 실행된 디스플레이 스크린에 맞춰 상대적인 크기를 반환하여 보여준다.
- 뷰포트(Viewport, 화면크기)를 기준으로 높이와 너비에 비례하기 때문에 반응형 웹을 구성하는데 유용한 단위이다.

- 결국 HD, FHD, QHD, 4K 등 다양한 해상도에서 보이는 컨텐츠 박스의 크기는 다르게 보인다.

## %와 차이점

- %와 vw,vh는 비슷해 보이지만 명확한 차이점이 존재한다.

- 컨텐츠를 감싸는 부모 요소에 `100%`로 설정했었을때 확인해 볼 수 있다.

![](https://velog.velcdn.com/images%2Fpixelstudio%2Fpost%2F09e747dd-dd69-41f1-849d-fb3576807fa2%2FScreenshot%20from%202021-05-10%2017-21-53.png)

- 첫번째 vw를 사용한 `div` 요소에 비해 두번째 100% `div`박스에서 약간의 공백이 생긴것을 확인할 수 있다.

- 즉, `vw`,`vh`는 화면의 전체 길이를 상대적으로 반환하기 때문에 스크롤바를 포함한 길이를 반환한다.  
- 반면 `%`는 `%`를 쓰는 요소의 부모 요소를 기준으로 길이를 반환한다.