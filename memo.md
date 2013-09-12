스터디 내용 메모

WebGL의 버퍼
색상 버퍼 - RGBA
심도 버퍼 - z값
스텐실 버퍼 - 렌더링 하거나 렌더링 하지 않을 영역의 경계

색상 버퍼의 알파체널과 심도버퍼는 활성화
스텐실 버퍼는 비활성화

원시 타입
POINTS, LINE, LINE_STRIP, LINE_LOOP, TRIANGLES, TRIANGLE_STRIP, TRIANGLE_FAN

정점 데이터

정점 버퍼 객체 (Vertex Buffer Object VBO)
createBuffer()
bindBuffer(GLenum target, WebGLBuffer buffer)
bufferData(GLenum target, ArrayBuffer data, GLenum usage)

어트리뷰트 및 유니폼
GLint getAttribLocation(WebGLProgram program, DOMString name)
WebGLUniformLocation getUniformLocation(WebGLProgram program, DOMString name)
void enableVertexAttribArray(GLunit index)


뷰 적용
뷰 절두체: 어떤 물체를 그 밑변과 평행하는 평면으로 자를 때 그 밑변과 평면 사이의 부분
가상 카메라: 우리가 보는 위치와 관찰하는 대상을 기준으로 한 각도 및 시점 규칙(멀리 있는 객체가 작게 보이는지 여부)
뷰를 명시적으로 정의하고 3D에서 2D 공간으로 좌표를 매핑하는 방식도 정의해야 한다.

클립좌표
WebGL은 기준점 (0,0,0)을 중심으로 하는 클립 볼륨을 갖고 있고 x, y, z축으로 +/-1만큼 확장
클립 볼륨은 프래그먼트 셰이더가 랜더링할 (x,y,z) 점을 정의한다.

왜 좌표를 조작할까?
3D 좌표를 조작하는 이유 중 하나는 이를 통해 좀 더 직관적으로 값을 처리할 수 있기 때문이다.
(0.36,0.06,0.12) 보다는 (30,5,10) 같은 좌표가 좀 더 자연스럽다.
그래서 Matrix 연산을 알아야함.
특정 모델에 대한 상대좌표, 세계에 대한 상대좌표, 가상 카메라에 대한 상대좌표

void viewport(GLint x, GLint y, GLsizei width, GLsizei height);
웹지엘이 뷰포트를 전체 캔버스로 초기화하기는 하지만 캔버스의 크기가 변할 때는 뷰포트를 자동으로 조정하지 않는다.
이렇게 하지 않는 이유는 뷰포트를 조정할 경우 수동으로 뷰포트를 설정한 애플리케이션에서 오작동을 일으키기 때문이다.
이로 인해, 렌더링하기 전에 뷰포트를 현재 캔버스 크기로 명시적으로 설정하는 게 좋다.
onresize 이벤트핸들러를 활용한다.

MVP 메트릭스
모델 - 뷰 매트릭스 (World - Model Matrix, World - View Matrix)
투영 매트릭스


텍스처
텍스처의 너비와 높이는 보통 같다.
64, 128, 256... 2의 n승 크기
(s,t) (0,0) ~ (1,1)
WebGLTexture createTexture();
void bindTexture(GLenum target, WebGLTexture texture);
GLbooean isTexture(WegGLTexture);
void deleteTexture(WebGETexture);
void texImage2D(GLeunm target, GLint level, GLEnum internalformat, GLEnum format, GLenum type, [source]);
void texImage2D(GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type ArrayBufferView? pixels);

