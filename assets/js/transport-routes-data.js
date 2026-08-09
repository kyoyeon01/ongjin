/**
 * Transport Routes — 옹진군 주요 항로 예시 데이터
 * (실시간 운항 정보가 아닌 일반적인 안내용 예시입니다.)
 */
window.TRANSPORT_ROUTES = [
  {
    id: "baengnyeong",
    label: "인천 ↔ 백령도",
    type: "ferry",
    islandShort: "백령",
    outbound: {
      fromLabel: "인천 출발",
      toLabel: "백령 도착",
      rows: [
        { depart: "08:00", arrive: "11:50", duration: "약 3시간 50분", ship: "코리아프라이드호" },
        { depart: "08:30", arrive: "12:20", duration: "약 3시간 50분", ship: "하모니플라워호" },
        { depart: "13:00", arrive: "16:50", duration: "약 3시간 50분", ship: "코리아프라이드호" },
        { depart: "13:40", arrive: "17:30", duration: "약 3시간 50분", ship: "하모니플라워호" },
      ],
    },
    inbound: {
      fromLabel: "백령 출발",
      toLabel: "인천 도착",
      rows: [
        { depart: "08:20", arrive: "12:10", duration: "약 3시간 50분", ship: "하모니플라워호" },
        { depart: "09:00", arrive: "12:50", duration: "약 3시간 50분", ship: "코리아프라이드호" },
        { depart: "13:30", arrive: "17:20", duration: "약 3시간 50분", ship: "하모니플라워호" },
        { depart: "14:10", arrive: "18:00", duration: "약 3시간 50분", ship: "코리아프라이드호" },
      ],
    },
    terminals: [
      {
        name: "인천항 연안여객터미널",
        image: "assets/images/ship-bg.webp",
        address: "인천광역시 중구 연안부두로 94",
        phone: "032-880-3100",
        parking: "연안여객터미널 주차장 이용 가능",
      },
      {
        name: "용기포항 여객터미널",
        image: "assets/images/course/overnight-baengnyeongdo.webp",
        address: "인천광역시 옹진군 백령면 용기포로 123",
        phone: "032-836-2501",
        parking: "터미널 인근 공영주차장 이용",
      },
    ],
  },
  {
    id: "daecheong",
    label: "인천 ↔ 대청도",
    type: "ferry",
    islandShort: "대청",
    outbound: {
      fromLabel: "인천 출발",
      toLabel: "대청 도착",
      rows: [
        { depart: "08:00", arrive: "12:30", duration: "약 4시간 30분", ship: "코리아프라이드호" },
        { depart: "08:30", arrive: "13:00", duration: "약 4시간 30분", ship: "하모니플라워호" },
        { depart: "13:00", arrive: "17:30", duration: "약 4시간 30분", ship: "코리아프라이드호" },
      ],
    },
    inbound: {
      fromLabel: "대청 출발",
      toLabel: "인천 도착",
      rows: [
        { depart: "07:40", arrive: "12:10", duration: "약 4시간 30분", ship: "하모니플라워호" },
        { depart: "08:10", arrive: "12:40", duration: "약 4시간 30분", ship: "코리아프라이드호" },
        { depart: "12:50", arrive: "17:20", duration: "약 4시간 30분", ship: "하모니플라워호" },
      ],
    },
    terminals: [
      {
        name: "인천항 연안여객터미널",
        image: "assets/images/ship-bg.webp",
        address: "인천광역시 중구 연안부두로 94",
        phone: "032-880-3100",
        parking: "연안여객터미널 주차장 이용 가능",
      },
      {
        name: "대청도 선진포항",
        image: "assets/images/island/photo-daecheong-01.webp",
        address: "인천광역시 옹진군 대청면 대청로 1",
        phone: "032-836-2001",
        parking: "선진포항 인근 주차장 이용",
      },
    ],
  },
  {
    id: "yeonpyeong",
    label: "인천 ↔ 연평도",
    type: "ferry",
    islandShort: "연평",
    outbound: {
      fromLabel: "인천 출발",
      toLabel: "연평 도착",
      rows: [
        { depart: "08:50", arrive: "10:50", duration: "약 2시간", ship: "에스타호" },
        { depart: "13:30", arrive: "15:30", duration: "약 2시간", ship: "에스타호" },
        { depart: "16:00", arrive: "18:00", duration: "약 2시간", ship: "코리아나호" },
      ],
    },
    inbound: {
      fromLabel: "연평 출발",
      toLabel: "인천 도착",
      rows: [
        { depart: "09:20", arrive: "11:20", duration: "약 2시간", ship: "코리아나호" },
        { depart: "11:20", arrive: "13:20", duration: "약 2시간", ship: "에스타호" },
        { depart: "16:00", arrive: "18:00", duration: "약 2시간", ship: "에스타호" },
      ],
    },
    terminals: [
      {
        name: "인천항 연안여객터미널",
        image: "assets/images/ship-bg.webp",
        address: "인천광역시 중구 연안부두로 94",
        phone: "032-880-3100",
        parking: "연안여객터미널 주차장 이용 가능",
      },
      {
        name: "연평항 여객선터미널",
        image: "assets/images/island/photo-yeonpyeong-01.webp",
        address: "인천광역시 옹진군 연평면 연평로 120",
        phone: "032-831-2701",
        parking: "연평항 공영주차장 이용",
      },
    ],
  },
  {
    id: "deokjeok",
    label: "인천 ↔ 덕적도",
    type: "ferry",
    islandShort: "덕적",
    outbound: {
      fromLabel: "인천 출발",
      toLabel: "덕적 도착",
      rows: [
        { depart: "08:00", arrive: "09:20", duration: "약 1시간 20분", ship: "코리아킹호" },
        { depart: "10:30", arrive: "11:50", duration: "약 1시간 20분", ship: "블루제이드호" },
        { depart: "13:30", arrive: "14:50", duration: "약 1시간 20분", ship: "코리아킹호" },
        { depart: "16:00", arrive: "17:20", duration: "약 1시간 20분", ship: "블루제이드호" },
      ],
    },
    inbound: {
      fromLabel: "덕적 출발",
      toLabel: "인천 도착",
      rows: [
        { depart: "09:40", arrive: "11:00", duration: "약 1시간 20분", ship: "코리아킹호" },
        { depart: "12:10", arrive: "13:30", duration: "약 1시간 20분", ship: "블루제이드호" },
        { depart: "15:10", arrive: "16:30", duration: "약 1시간 20분", ship: "코리아킹호" },
        { depart: "17:40", arrive: "19:00", duration: "약 1시간 20분", ship: "블루제이드호" },
      ],
    },
    terminals: [
      {
        name: "인천항 연안여객터미널",
        image: "assets/images/ship-bg.webp",
        address: "인천광역시 중구 연안부두로 94",
        phone: "032-880-3100",
        parking: "연안여객터미널 주차장 이용 가능",
      },
      {
        name: "덕적도 진리항",
        image: "assets/images/transport/terminal-deokjeok.webp",
        address: "인천광역시 옹진군 덕적면 진리항로 25",
        phone: "032-832-3501",
        parking: "진리항 인근 공영주차장 이용",
      },
    ],
  },
  {
    id: "jawol",
    label: "인천 ↔ 자월도",
    type: "ferry",
    islandShort: "자월",
    outbound: {
      fromLabel: "인천 출발",
      toLabel: "자월 도착",
      rows: [
        { depart: "08:20", arrive: "09:30", duration: "약 1시간 10분", ship: "코리아킹호" },
        { depart: "11:00", arrive: "12:10", duration: "약 1시간 10분", ship: "블루제이드호" },
        { depart: "14:00", arrive: "15:10", duration: "약 1시간 10분", ship: "코리아킹호" },
        { depart: "16:30", arrive: "17:40", duration: "약 1시간 10분", ship: "블루제이드호" },
      ],
    },
    inbound: {
      fromLabel: "자월 출발",
      toLabel: "인천 도착",
      rows: [
        { depart: "09:50", arrive: "11:00", duration: "약 1시간 10분", ship: "코리아킹호" },
        { depart: "12:30", arrive: "13:40", duration: "약 1시간 10분", ship: "블루제이드호" },
        { depart: "15:30", arrive: "16:40", duration: "약 1시간 10분", ship: "코리아킹호" },
        { depart: "18:00", arrive: "19:10", duration: "약 1시간 10분", ship: "블루제이드호" },
      ],
    },
    terminals: [
      {
        name: "인천항 연안여객터미널",
        image: "assets/images/ship-bg.webp",
        address: "인천광역시 중구 연안부두로 94",
        phone: "032-880-3100",
        parking: "연안여객터미널 주차장 이용 가능",
      },
      {
        name: "자월도 선착장",
        image: "assets/images/island/photo-jawol-03.webp",
        address: "인천광역시 옹진군 자월면 자월로 78",
        phone: "032-832-3801",
        parking: "선착장 인근 소규모 주차장 이용",
      },
    ],
  },
  {
    id: "seungbong",
    label: "인천 ↔ 승봉도",
    type: "ferry",
    islandShort: "승봉",
    outbound: {
      fromLabel: "인천 출발",
      toLabel: "승봉 도착",
      rows: [
        { depart: "08:40", arrive: "10:10", duration: "약 1시간 30분", ship: "블루제이드호" },
        { depart: "11:20", arrive: "12:50", duration: "약 1시간 30분", ship: "코리아킹호" },
        { depart: "14:40", arrive: "16:10", duration: "약 1시간 30분", ship: "블루제이드호" },
      ],
    },
    inbound: {
      fromLabel: "승봉 출발",
      toLabel: "인천 도착",
      rows: [
        { depart: "10:30", arrive: "12:00", duration: "약 1시간 30분", ship: "블루제이드호" },
        { depart: "13:10", arrive: "14:40", duration: "약 1시간 30분", ship: "코리아킹호" },
        { depart: "16:30", arrive: "18:00", duration: "약 1시간 30분", ship: "블루제이드호" },
      ],
    },
    terminals: [
      {
        name: "인천항 연안여객터미널",
        image: "assets/images/ship-bg.webp",
        address: "인천광역시 중구 연안부두로 94",
        phone: "032-880-3100",
        parking: "연안여객터미널 주차장 이용 가능",
      },
      {
        name: "승봉도 선착장",
        image: "assets/images/course/day-trip-seungbongdo.webp",
        address: "인천광역시 옹진군 자월면 승봉로 15",
        phone: "032-832-3901",
        parking: "선착장 인근 임시 주차장 이용",
      },
    ],
  },
  {
    id: "ijak",
    label: "인천 ↔ 이작도",
    type: "ferry",
    islandShort: "이작",
    outbound: {
      fromLabel: "인천 출발",
      toLabel: "이작 도착",
      rows: [
        { depart: "08:10", arrive: "09:50", duration: "약 1시간 40분", ship: "코리아킹호" },
        { depart: "11:40", arrive: "13:20", duration: "약 1시간 40분", ship: "블루제이드호" },
        { depart: "15:00", arrive: "16:40", duration: "약 1시간 40분", ship: "코리아킹호" },
      ],
    },
    inbound: {
      fromLabel: "이작 출발",
      toLabel: "인천 도착",
      rows: [
        { depart: "10:10", arrive: "11:50", duration: "약 1시간 40분", ship: "코리아킹호" },
        { depart: "13:40", arrive: "15:20", duration: "약 1시간 40분", ship: "블루제이드호" },
        { depart: "17:00", arrive: "18:40", duration: "약 1시간 40분", ship: "코리아킹호" },
      ],
    },
    terminals: [
      {
        name: "인천항 연안여객터미널",
        image: "assets/images/ship-bg.webp",
        address: "인천광역시 중구 연안부두로 94",
        phone: "032-880-3100",
        parking: "연안여객터미널 주차장 이용 가능",
      },
      {
        name: "대이작도 선착장",
        image: "assets/images/course/overnight-daeijakdo.webp",
        address: "인천광역시 옹진군 자월면 이작로 42",
        phone: "032-832-3951",
        parking: "선착장 인근 공용주차장 이용",
      },
    ],
  },
  {
    id: "yeongheung",
    label: "인천 ↔ 영흥도",
    type: "bridge",
    islandShort: "영흥",
    scheduleTitle: "교통 안내",
    terminalTitle: "교통 정보",
    outbound: {
      title: "영흥대교",
      fromLabel: "구분",
      toLabel: "내용",
      rows: [
        { depart: "이용 방법", arrive: "차량·버스 이동", duration: "통행료 없음", ship: "상시 이용" },
        { depart: "연결 구간", arrive: "선재도 ↔ 영흥도", duration: "약 1.5km", ship: "왕복 2차로" },
        { depart: "안내 전화", arrive: "옹진군청", duration: "032-899-2114", ship: "문의 가능" },
        { depart: "참고", arrive: "기상 특보 시 통제 가능", duration: "사전 확인", ship: "도로현황 확인" },
      ],
    },
    inbound: {
      title: "선재대교",
      fromLabel: "구분",
      toLabel: "내용",
      rows: [
        { depart: "이용 방법", arrive: "차량·버스 이동", duration: "통행료 없음", ship: "상시 이용" },
        { depart: "연결 구간", arrive: "대부도 ↔ 선재도", duration: "약 1.4km", ship: "왕복 2차로" },
        { depart: "안내 전화", arrive: "옹진군청", duration: "032-899-2114", ship: "문의 가능" },
        { depart: "참고", arrive: "주말·성수기 정체", duration: "여유 시간", ship: "도로현황 확인" },
      ],
    },
    terminals: [
      {
        name: "영흥대교",
        image: "assets/images/island/photo-yeongheung-03.webp",
        address: "인천광역시 옹진군 영흥면 영흥대로 일원",
        phone: "032-899-2114",
        parking: "교량 인근 공용주차장·휴게공간 이용",
      },
      {
        name: "선재대교",
        image: "assets/images/island/photo-yeongheung-02.webp",
        address: "인천광역시 옹진군 북도면 선재로 일원",
        phone: "032-899-2114",
        parking: "선재도·대부도 방면 공용주차장 이용",
      },
    ],
  },
  {
    id: "sinsimodo",
    label: "인천 ↔ 신시모도",
    type: "ferry",
    islandShort: "신도",
    outbound: {
      fromLabel: "삼목 출발",
      toLabel: "신도 도착",
      rows: [
        { depart: "07:00", arrive: "07:20", duration: "약 20분", ship: "신도페리호" },
        { depart: "09:00", arrive: "09:20", duration: "약 20분", ship: "신도페리호" },
        { depart: "11:00", arrive: "11:20", duration: "약 20분", ship: "신도페리호" },
        { depart: "14:00", arrive: "14:20", duration: "약 20분", ship: "신도페리호" },
        { depart: "16:00", arrive: "16:20", duration: "약 20분", ship: "신도페리호" },
        { depart: "18:00", arrive: "18:20", duration: "약 20분", ship: "신도페리호" },
      ],
    },
    inbound: {
      fromLabel: "신도 출발",
      toLabel: "삼목 도착",
      rows: [
        { depart: "07:30", arrive: "07:50", duration: "약 20분", ship: "신도페리호" },
        { depart: "09:30", arrive: "09:50", duration: "약 20분", ship: "신도페리호" },
        { depart: "11:30", arrive: "11:50", duration: "약 20분", ship: "신도페리호" },
        { depart: "14:30", arrive: "14:50", duration: "약 20분", ship: "신도페리호" },
        { depart: "16:30", arrive: "16:50", duration: "약 20분", ship: "신도페리호" },
        { depart: "18:30", arrive: "18:50", duration: "약 20분", ship: "신도페리호" },
      ],
    },
    terminals: [
      {
        name: "삼목선착장",
        image: "assets/images/theme/theme-sea.webp",
        address: "인천광역시 중구 운서동 산 157-3",
        phone: "032-751-8800",
        parking: "삼목선착장 공영주차장 이용",
      },
      {
        name: "신도선착장",
        image: "assets/images/course/day-trip-sinsimodo.webp",
        address: "인천광역시 옹진군 북도면 신도로 12",
        phone: "032-752-4114",
        parking: "신도선착장 인근 주차장 이용",
      },
    ],
  },
];
