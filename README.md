# 💻 Clustory 

**개발 기간**: 2025.08.04 ~ 2025.08.25  

🏝️ 기억과 감정으로 **동네를 다시 뛰게 하는** AI 감정 지도 🏝️


<img width="1000" height="700" alt="image" src="https://github.com/user-attachments/assets/3d8af6d3-0ec5-4c4b-a4da-4a15d81295a7" />

---


<div align=center>

| <a href="https://github.com/xuuwon/"><img src="https://avatars.githubusercontent.com/u/181433031?v=4" width="100px"/><br/><sub><b>조유원</b></sub></a> | <a href="https://github.com/ume24/"><img src="https://avatars.githubusercontent.com/u/134575309?v=4" width="100px"/><br/><sub><b>정유미</b></sub></a> | <a href="https://github.com/agunggung22/"><img src="https://avatars.githubusercontent.com/u/195331165?v=4" width="100px"/><br/><sub><b>조혜원</b></sub> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: |
| **지도 관련 API 및 메인 UI**                                                                                                                                                         | **글 작성 API 및 기획 문서 작성**                                                                                                                                         | **피드 API 및 기획 문서 작성**                                                                                                                                                              |



</div>

---
## 🔗 배포 링크

> ### [마음결](https://emotion-map-nine.vercel.app/)

## 🗂️ 발표 자료

> ### [시연 영상](https://www.canva.com/design/DAGw9YLMcgA/dEiKZgmeDjbIOwKJTJzZsQ/watch?utm_content=DAGw9YLMcgA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he6a083c5dc)
> ### [PPT](https://drive.google.com/file/d/1BN1IlQnz7In6UwUzxpUcDN9cREqLtFyW/view?usp=sharing)
---

## 📌 주요 기능

✏️ **간편한 감정 기록 UI**  
- 텍스트와 사진 업로드  
- 지도에서 위치 지정 (주소 검색 -> 마커 표시)  
- 익명 작성

🤖 **AI 감정 태깅 & 시각화**  
- Google Gemini 2.0 Flash 기반 감정 분류  
- ‘위로’, ‘향수’, ‘우정’ 등 대표 감정 태그 자동 생성  
- 감정별 색상/이모지로 지도에 마커 표시  

🧩 **감성 지도 & 피드**  
- 실시간 감성 피드: 최신 감정 기록을 카드 형태로 확인  
- 지도/피드 연동으로 커뮤니티적 경험 제공

🗺️ **감정별 코스 추천 (정릉 기준)**  
- 특정 감정(예: ‘위로’, ‘향수’)에 맞는 맞춤형 코스 자동 추천  
- 현재는 성북구를 기반으로 산책길·카페·분식집 등 코스 제공

---

## 🌟 서비스 차별화 포인트

1️⃣ **AI 기반 자동화 분석**  
- 사용자가 글만 남겨도 자동으로 감정 태그 생성  
- 감정별 맞춤 장소/추천 코스 제공  

2️⃣ **몰입형 UX 설계**  
- 이모지, 컬러 마커 등 직관적 시각화  
- 익명 글쓰기 기능 → 솔직한 감정 표현 가능  

3️⃣ **차별화된 서비스 관점**  
- 기존 지도 서비스는 위치·거리 중심, SNS 서비스는 관계·팔로우 중심  
   **Clustory는 감정을 중심으로 장소와 사람을 연결**  
- 감정 태그를 기반으로 한 탐색·코스 추천을 제공하여 새로운 지역 경험 창출

---

## 🛠️ 기술 스택

<div align="center">

<!-- 윗줄 : 원형 아이콘 -->
<img src="https://skillicons.dev/icons?i=nextjs" width="48" height="48" alt="Next.js"/>
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React"/>
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="TailwindCSS"/>
<img src="https://skillicons.dev/icons?i=pnpm" width="48" height="48" alt="pnpm"/>

<br/>
<!-- 아랫줄 : 네모 배지 -->
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" height="28" alt="axios"/>
<img src="https://img.shields.io/badge/SWR-000000?style=for-the-badge&logo=vercel&logoColor=white" height="28" alt="SWR"/>

</div>


---

## 🖥️ 서비스 소개

|                                                메인화면                                                 |                                                위치 등록                                                |                                                   AI 분석                                                    |
| :---------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/fd65eb23-b5b0-42fd-a07b-e0cc7f5bfe0d" alt="main"> | <img src="https://github.com/user-attachments/assets/1b915778-ddc5-4360-ac7f-8ecb2498a114" alt="diary"> | <img src="https://github.com/user-attachments/assets/50147474-8738-4f5f-9738-6906181ac479" alt="analysis"> |

|                                                지도 검색                                                |                                                  코스 추천                                                   |                                                  감성 피드                                                  |
| :------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/0a965bd3-77c1-443b-95ce-dcf2c0a7f007" alt="map"> | <img src="https://github.com/user-attachments/assets/6ff4d840-31be-4f3d-a58f-aedc996b0479" alt="recommend"> | <img src="https://github.com/user-attachments/assets/6534ab28-9584-4648-a22e-6ac0b25b2f74" alt="feed"> |
