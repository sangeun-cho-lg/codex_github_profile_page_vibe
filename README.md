# GitHub Pages 개발자 포트폴리오

GitHub Pages에 바로 배포할 수 있도록 만든 한국어 우선 원페이지 개발자 포트폴리오입니다. 정적 HTML/CSS/JS만 사용해서 가볍고 수정하기 쉽게 구성했습니다.

## 로컬에서 확인하기

브라우저에서 [index.html](./index.html)을 직접 열어도 되고, 더 안정적으로 확인하려면 간단한 정적 서버로 실행하면 됩니다.

```powershell
python -m http.server 8000
```

그 후 `http://localhost:8000` 에서 확인합니다.

## 콘텐츠 교체 위치

- 소개 문구와 섹션 구조: [index.html](./index.html)
- 프로젝트 카드 데이터: [assets/script.js](./assets/script.js)의 `portfolioProjects`
- 연락 링크 데이터: [assets/script.js](./assets/script.js)의 `contactChannels`
- 색상, 간격, 전체 스타일: [assets/styles.css](./assets/styles.css)

## GitHub Pages 배포

`.github/workflows/deploy.yml` 이 `main` 브랜치 푸시 시 GitHub Pages로 자동 배포합니다.

1. GitHub에서 이 저장소의 `Settings > Pages` 로 이동합니다.
2. `Build and deployment`의 Source를 `GitHub Actions`로 선택합니다.
3. `main` 브랜치에 푸시하면 Actions가 배포를 진행합니다.

## 이후 커스터마이징 추천

- `index.html`의 이름, 소개 문구, CTA 텍스트를 실제 프로필에 맞게 교체
- `assets/script.js`의 프로젝트 링크와 연락 채널을 실제 주소로 교체
- 필요하면 프로젝트 카드 수를 늘리거나 영어 버전을 별도 페이지로 확장
