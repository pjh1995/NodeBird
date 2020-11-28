`next version 9`

`pages는 무조건 pages 여야함 next가 pages 폴더를 page로 만들어줌`

`import React from 'react'; next는 필요 x`

`_app.js 모든 페이지에서 공통으로 쓰이는 것`

`디자인 순서 : 모바일 -> 태블릿 -> 데스크탑`

`col xs: 모바일 sm:태블릿 md:작은 데스크탑 ` `한줄은 xs + sm + md = 24` `24 이상이면 다음줄`

`<tag style={{width:10}}>` `{} !== {}` `리랜더링`

`entd는 e.preventDefault(); 이미 적용 되어있음.`

`react-virtualized :: 무한스크롤링중 n개만 남기고 나머지는 메모리에 저장시켜버림 : 화면에 렉이 안남!!!!!!`

`빌드 시 아이콘 설명 λ : 서버사이드 렌더링 페이지, ● : 서버사이드 렌더링 html로 만들어놓은 페이지, ○ : static 페이지`

`Todo nextjs.org/docs/advanced-features 보고 없는 페이지 추가하기`

`cross-env ANALYZE=true NODE_ENV=production next build`

`process.env.ANALYZE=true process.env.NODE_ENV=production`

`cross-env :: process.env 변경을 윈도우에서 하려면 사용해야함`
