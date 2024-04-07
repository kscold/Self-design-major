- res.json()은 [[JSON(Java Script Object Notation)]]이 아닌 것도 [[JSON(Java Script Object Notation)]] 형식으로 바꾸어서 보내준다. 

- 즉 content-type 헤더를 application/JSON으로 고정한다. 

- 내부적으로 res.json()도 마지막에 [[res.send()]]를 호출한다.  