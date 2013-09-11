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

