# 이미지 스프라이트 PNG 압출률과 Webapck base64 최적화 비교 테스트

```bash
# 소스 빌드 & 소스 확인 - http://127.0.0.1:8080
$ yarn start
```

---

# 모바일 환경에서 이미지 스프라이트가 필요할까?

Front-end 개발을 위한 번들링 설정 중 가장 힘든 것은 언제나 Image Sprite이다. 일반적인 번들링 과정과 달리 File System을 과도하게 이용하고, 스타일 파일을 생성하기 위한 'CSS용 Template'을 만들어야 하는 등, 다른 도구들이 유기적으로 JavaScript 생태계에 녹아드는 데에 반해, 어딘가 혼자 툭 튀어나와서는 여러모로 번거롭다.

새 프로젝트에 앞서 도무지 `spritesmith`를 설정하기 귀찮았던 찰나, '과연 아직까지도 Image Sprite가 웹최적화로서 의미가 있을까?' 하는 의문이 들었다.

Image Sprite 도구의 대표인 [spritesmith](https://www.npmjs.com/package/spritesmith) 조차도 마지막 업데이트가 7개월이나 지났고, Image Sprite가 여전히 많은 사람들이 동의하는 개발 방법론이라면 빠르게 변화하는 JavaScript 생태계에서 이렇게까지 불편하고 못난 구조를 이어나가진 않을 것이라는 확신도 들었다.

그렇게 '필시 더 이상 Image Sprite는 필요하지 않을 것이다.' 라는 결론을 마음에 안고 근거를 수집하기 위해 구글링을 시작했다.

## Image Sprite

> [Best Practices for Speeding Up Your Web Site : Yahoo Developer Networks](https://developer.yahoo.com/performance/rules.html#under25)
>
> 엔드유저가 겪는 대기시간의 80%는 front-end에서 소비된다. 그 시간의 대부분은 페이지에서 필요한 모든 요소 - 이미지, 스타일시트, 스크립트, 플래시 등등 - 를 다운받는 것이다. 이 요소들의 숫자를 줄이는 것으로 페이지를 렌더링하기 위한 HTTP 요청의 갯수를 줄일 수 있다. 이것은 더욱 빠른 페이지의 핵심이다.
	
Image Sprite는 여러개의 이미지 리소스를 하나의 이미지로 합치고, `background-size`, `backgorund-position`등의 CSS 속성을 통해 이미지를 렌더링하는 방법으로, 이미지 다운로드에 걸리는 시간과 HTTP 요청을 감소시킴으로 웹 Front-end의 성능을 최적화한다.

그러나 당연히 하나의 큰 이미지 리소스를 다운받는 것에 대한 부담이기에, 상황에 따라 Image Sprite의 적용 여부를 결정하기 위한 방법론들도 있다.

> [Optimize CSS Sprites : Yahoo Developer Networks](https://developer.yahoo.com/performance/rules.html#opt_sprites)
>
> - 일반적으로 이미지를 수직으로 대각선으로 수평으로 정렬하면 파일 크기가 작아집니다.
> - 스프라이트에서 유사한 색상을 결합하면 PNG8에 적합하도록 색상 수가 256 색상 이하로 이상적으로 낮아집니다.
> - "모바일 친화적으로" 스프라이트의 이미지 사이에 큰 간격을 두지 마십시오. 이것은 파일 크기에 큰 영향을 미치지는 않지만 클라이언트가 이미지를 픽셀 맵으로 압축 해제하는 데 필요한 메모리가 더 적게 필요합니다. 100 x 100 이미지는 10,000 픽셀이며 1,000 x 1,000은 1,000,000 픽셀입니다.

이미지 리소스의 크기 제한은 브라우저별로 차이가 있으나 되도록 작게 유지하는 것이 좋고, 대부분의 Image Sprite는 투명 배경이 필요하기 때문에 Indexed Color 기반의 PNG나 GIF 포멧을 사용해야 하며, 따라서 색상의 갯수가 너무 많은 사진 등의 이미지는 JPEG 포멧의 독립 이미지로 이용하는 편이 용량면에서 좋다.

## HTTP/2의 등장

이러한 웹최적화의 핵심인 Image Sprite가 처음 의심의 대상이 된 계기는 2015년, HTTP/2의 등장이었다. 

[HTTP/2에서는 여러 HTTP 요청을 병렬로 처리](https://developers.google.com/web/fundamentals/performance/http2/?hl=ko#_4)할 수 있게 되었고, 따라서 웹 최적화에 있어 가장 중요한 명제였던 'HTTP 요청 줄이기'가 앞으로도 유효할 지에 대한 논의가 있어 왔다.

> - [Does using image sprites make sense in HTTP/2 - Stackoverflow](https://stackoverflow.com/questions/32160790/does-using-image-sprites-make-sense-in-http-2)
> - [Are CSS Sprites A Mobile Web “Worst Practice?” - Cloud4](https://cloudfour.com/thinks/are-css-sprites-a-mobile-web-worst-practice/)
> - [HTTP/2 arrives but sprite sets ain’t no dead - Octo](https://blog.octo.com/en/http2-arrives-but-sprite-sets-aint-no-dead/)

위의 논의와 기사에 의하면 각각의 주장에 대한 의견은 아래와 같다.

### 단일 이미지가 낫다!

- 스프라이트 이미지는 이용하는 페이지 외의 불필요한 이미지 리소스를 모두 불러온다.
- 스프라이트 이미지는 소수의 이미지 변경에도 모든 이미지의 브라우저 캐시가 무효화된다.
- iOS 웹브라우저의 경우 25kb 이상의 요소는 캐싱하지 않는다.

### Image Sprite를 써야한다!

- PNG 압축 알고리즘이 여러 개의 단일 이미지보다 한장의 스프라이트 이미지에서 더욱 효율적으로 동작한다.
- HTTP/2는 로드 시간이 현저히 감소하지만 HTTP 프로토콜 향상만으로는 front-end 최적화의 유용성을 충분히 대체하기 어렵다.

이렇게 모아보니 HTTP/2의 존재와 무관하게 앞서서 얘기한 Image Sprite의 프로젝트 적용조건과 크게 다르지 않아 보이지만, 관련한 문제를 직접 테스트한 Octo 블로그의 기사 - [HTTP/2 arrives but sprite sets ain’t no dead - Octo](https://blog.octo.com/en/http2-arrives-but-sprite-sets-aint-no-dead/) - 는 시사하는 바가 크다.

![Images loading time versus images total size, browser and protocol](https://blog.octo.com/wp-content/uploads/2015/12/sprites-graph4.png)

위 그래프는 이미지의 갯수에 따라 소요되는 로딩 시간을 HTTP 버전 별로 그린 것으로, 전반적인 성능 향상을 제외하고는 두 버전 모두 동일하게 이미지의 갯수에 따라 시간이 늘어남을 확인할 수 있다. HTTP/2 프로토콜이 표준으로 자리잡는다 하더라도 여전히 Image Sprite 적용은 필요해 보인다.

## 대안

지금까지 알아본 바, '더 이상 Image Sprite를 이용한 웹최적화는 유효하지 않을 것이다.' 라는 최초의 가정은 결국 잘못되었다. 그러나 나는 Front-end 개발의 복잡도를 현저하게 증가시키는 Image Sprite 도구들이 너무너무 싫다. 언제 어디서 작업을 멈추어도 손쉽게 다시 시작할 수 있는 코드가 좋은 코드라고 믿기 때문이다.

정녕 Image Sprite를 피하기 위한 방법은 없는 것일까?

### DataURI, 그리고 SVG

Bitmap의 경우 DataURI, 그리고 Vector의 경우에는 SVG를 사용하면 별도의 HTTP 요청없이 Front-end 자원 내에 문자열로서 이미지를 전달할 수 있다. 그리고 문자열로 대체된 이미지는 `Webpack` 등의 번들링 도구를 통해 최적화될 수 있다고 한다.

그러나 이는 클라이언트가 최초 로딩하는 번들링된 파일의 용량을 증가시킬 수 있고, 문자열로 치환된 이미지(특히 dataURI의 경우)는 경우에 따라 이미지에 비해 과도하게 용량이 커질 위험이 있어 Image Sprite와 마찬가지로 상황에 맞게 사용하는 지혜가 필요하다.

궁금하니까 간단하게 직접 테스트 해보았다.

> [이미지 스프라이트 vs Base64와 Webpack 용량 비교 (소스코드) : Github](https://github.com/reumia/image-sprite-vs-webpack-string)

64 x 64 단일 색상과 다중 색상의 Bitmap 이미지, 그리고 다중 색상의 Vector 이미지를 각 10장씩 `node-sprite-generator`와 `webpack`을 이용해 결과물을 비교하였다. 결과는 아래와 같다.

![](https://reumia.github.io/image-sprite-vs-webpack-string/example.png)

|                                | 단일 색상     | 다중 색상       |
|--------------------------------|---------------|-----------------|
| PNG (Image Sprite)             | 15 kb         | 35 kb          |
| JS (dataURI) / JS.GZ (gzipped) | 19 kb / 13 kb | 50 kb / 37 kb |
| JS (SVG) / JS.GZ (gzipped)     | -             | __23 kb / 7kb__ |

예제 이미지, 또는 소스 코드에서 확인할 수 있듯이 육안으로 보이는 이미지의 퀄리티에는 큰 차이가 없으며, gzip 압축 시 SVG에서 눈에 띄는 용량 차이를 확인할 수 있다.

모바일 환경일 경우, 레티나 환경 대응을 위한 여러벌의 스프라이트 이미지가 필요할 수 있고, 대부분의 브라우저가 SVG를 지원하므로 SVG를 선택하는 것이 모든 방면에서 좋을 듯 하다.

SVG가 좋다는 것을 익히 알고는 있었지만, XML 형태의 장황한 모양새 때문에 사용할 때마다 늘 마음에 짐이 있었는데, 테스트를 통해 직접 확인해보니 앞으로 마음 편히 SVG를 사용할 수 있게 되었다.

## 마치며

관련 자료 리서치 중 앞서 언급한 [Octo 블로그의 기사](https://blog.octo.com/en/http2-arrives-but-sprite-sets-aint-no-dead/)는 시작과 진행이 본 포스팅과 굉장이 유사하며, 보다 더 깊이 있는 통찰을 준다. 또한 위 기사에서는 [테스트에 사용한 코드](https://github.com/benoit74/http2-sprites/)를 Github을 통해 공유하고 있으므로, 소스를 살펴보는 것도 개인적으로 유의미할 듯 하다.