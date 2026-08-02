/**
 * Theme Travel Page — 테마별 콘텐츠 데이터
 * images 배열만 수정하면 슬라이더 이미지가 교체됩니다.
 */
window.THEME_TRAVEL_DATA = {
  nature: {
    id: "nature",
    label: "자연 / 힐링",
    icon: "assets/icons/theme/tree.svg",
    placesTitle: "추천장소",
    cards: [
      {
        name: "백령도",
        desc: "유네스코 세계지질공원의 자연을 품은 섬",
        images: [
          "assets/images/island/photo-baengnyeong-01.webp",
          "assets/images/island/photo-baengnyeong-02.webp",
          "assets/images/island/hero-slide-baengnyeong-01.webp",
        ],
        places: [
          { name: "두무진", desc: "기암절벽이 만들어내는 서해의 대표 절경" },
          { name: "콩돌해변", desc: "콩알만 한 자갈과 파도 소리가 있는 힐링 명소" },
          { name: "남포리 습곡구조", desc: "10억 년의 시간을 간직한 지질 명소" },
        ],
      },
      {
        name: "덕적도",
        desc: "울창한 해송숲과 서해 풍경이 어우러진 힐링 섬",
        images: [
          "assets/images/island/hero-slide-deokjeok-01.webp",
          "assets/images/island/hero-slide-deokjeok-02.webp",
          "assets/images/course/day-trip-deokjeokdo.webp",
        ],
        places: [
          { name: "비조봉", desc: "섬 전체를 한눈에 담을 수 있는 전망 명소" },
          { name: "서포리 해수욕장", desc: "해송숲과 함께하는 아름다운 해변" },
          { name: "밧지름해변", desc: "한적하게 쉬어가기 좋은 숨은 해변" },
        ],
      },
      {
        name: "장봉도",
        desc: "숲길과 해변을 함께 즐길 수 있는 고요한 섬",
        images: [
          "assets/images/course/day-trip-jangbongdo.webp",
          "assets/images/theme/theme-nature.webp",
          "assets/images/theme/theme-sea.webp",
        ],
        places: [
          { name: "국사봉", desc: "장봉도에서 가장 탁 트인 전망을 만날 수 있는 곳" },
          { name: "한들 해수욕장", desc: "한적하고 고운 백사장이 매력적인 해변" },
          { name: "옹암해변", desc: "노을 풍경이 아름다운 대표 해변" },
        ],
      },
    ],
  },

  beach: {
    id: "beach",
    label: "바다 / 해변",
    icon: "assets/icons/theme/sea.svg",
    placesTitle: "추천장소",
    cards: [
      {
        name: "영흥도",
        desc: "드넓은 해변과 아름다운 서해 노을을 만나는 섬",
        images: [
          "assets/images/course/day-trip-yeongheungdo.webp",
          "assets/images/theme/theme-sea.webp",
          "assets/images/theme/theme-photo.webp",
        ],
        places: [
          {
            name: "장경리해수욕장",
            desc: "넓은 백사장과 서해의 낙조가 아름다워 많은 여행객이 찾는 대표 해변",
          },
          { name: "십리포해수욕장", desc: "해송숲과 바다가 함께 어우러진 해변" },
          {
            name: "노가리해변",
            desc: "붉은 해식절벽과 해식동굴이 만들어내는 독특한 해안 풍경",
          },
        ],
      },
      {
        name: "승봉도",
        desc: "맑은 바다와 고운 백사장이 어우러진 섬",
        images: [
          "assets/images/course/day-trip-seungbongdo.webp",
          "assets/images/theme/theme-sea.webp",
          "assets/images/theme/theme-photo.webp",
        ],
        places: [
          { name: "이일레해변", desc: "에메랄드빛 바다와 고운 모래가 인상적인 해변" },
          { name: "부채바위", desc: "파도에 깎여 만들어진 독특한 형태의 바위" },
          { name: "촛대바위", desc: "승봉도를 상징하는 촛대 모양의 기암" },
        ],
      },
      {
        name: "대청도",
        desc: "맑은 바다와 깨끗한 자연을 품은 섬",
        images: [
          "assets/images/course/overnight-daecheongdo.webp",
          "assets/images/theme/theme-sea.webp",
          "assets/images/theme/theme-nature.webp",
        ],
        places: [
          {
            name: "농여해변",
            desc: "몽돌과 맑은 바다가 어우러져 조용한 휴식을 즐기기 좋은 해변",
          },
          { name: "옥죽포해변", desc: "탁 트인 해안 풍경이 인상적인 대표 해변" },
          {
            name: "모래울해변",
            desc: "넓은 백사장과 잔잔한 파도로 가족 여행에 인기 있는 해변",
          },
        ],
      },
    ],
  },

  history: {
    id: "history",
    label: "역사 / 문화",
    icon: "assets/icons/theme/museum.svg",
    placesTitle: "추천장소",
    cards: [
      {
        name: "백령도",
        desc: "전설과 역사가 살아있는 섬",
        images: [
          "assets/images/island/photo-baengnyeong-04.webp",
          "assets/images/island/hero-slide-baengnyeong-02.webp",
          "assets/images/theme/theme-history.webp",
        ],
        places: [
          { name: "심청각", desc: "심청전의 배경이 된 설화의 공간" },
          { name: "백령기독교역사관", desc: "초기 기독교 역사를 살펴볼 수 있는 전시관" },
          { name: "중화동교회", desc: "100년의 역사를 간직한 교회" },
        ],
      },
      {
        name: "연평도",
        desc: "서해의 역사와 평화를 기억하는 섬",
        images: [
          "assets/images/course/overnight-yeonpyeongdo.webp",
          "assets/images/theme/theme-history.webp",
          "assets/images/theme/theme-photo.webp",
        ],
        places: [
          { name: "조기역사관", desc: "조기 어업의 역사를 담은 전시 공간" },
          {
            name: "연평도 포격전망대",
            desc: "역사의 현장을 바라보며 평화를 되새기는 전망 명소",
          },
          { name: "평화공원", desc: "역사와 자연을 함께 느낄 수 있는 평화의 공간" },
        ],
      },
      {
        name: "모도",
        desc: "예술과 자연이 공존하는 섬",
        images: [
          "assets/images/course/day-trip-sinsimodo.webp",
          "assets/images/theme/theme-history.webp",
          "assets/images/theme/theme-photo.webp",
        ],
        places: [
          {
            name: "배미꾸미 조각공원",
            desc: "바다를 배경으로 다양한 조각 작품을 감상할 수 있는 야외 예술공원",
          },
          { name: "시도 수기전망대", desc: "신시모도의 바다 풍경을 한눈에 담는 전망 명소" },
          { name: "모도 해안길", desc: "예술 작품과 바다가 이어지는 산책 코스" },
        ],
      },
    ],
  },

  activity: {
    id: "activity",
    label: "체험 / 액티비티",
    icon: "assets/icons/theme/shell.svg",
    placesTitle: "추천체험",
    cards: [
      {
        name: "신시모도",
        desc: "세개의 섬을 가장 자유롭게 즐기는 라이딩 여행",
        images: [
          "assets/images/course/day-trip-sinsimodo.webp",
          "assets/images/theme/theme-activity.webp",
          "assets/images/theme/theme-photo.webp",
        ],
        places: [
          {
            name: "전동바이크 투어",
            desc: "신도 선착장 인근에서 전동바이크를 대여해 신도·시도·모도를 둘러보는 체험",
          },
          {
            name: "자전거 일주",
            desc: "약 10km의 해안 코스를 따라 세 개의 섬을 한번에 둘러보는 체험",
          },
          { name: "염전 체험", desc: "시도의 염전에서 소금을 만드는 과정을 직접 체험" },
        ],
      },
      {
        name: "영흥도",
        desc: "바다를 가장 다채롭게 즐길 수 있는 액티비티 섬",
        images: [
          "assets/images/course/day-trip-yeongheungdo.webp",
          "assets/images/theme/theme-activity.webp",
          "assets/images/theme/theme-nature.webp",
        ],
        places: [
          {
            name: "십리포 오토캠핑장",
            desc: "해송숲과 바다가 어우러진 캠핑 체험",
          },
          { name: "갯벌 체험", desc: "썰물 때 펼쳐지는 갯벌에서 즐기는 가족 체험" },
          { name: "바다낚시 체험", desc: "서해의 바다를 가까이에서 즐기는 낚시 액티비티" },
        ],
      },
      {
        name: "선재도",
        desc: "가족과 함께 즐기기 좋은 체험 여행지",
        images: [
          "assets/images/course/day-trip-seonjaedo.webp",
          "assets/images/theme/theme-activity.webp",
          "assets/images/theme/theme-sea.webp",
        ],
        places: [
          {
            name: "목섬 바닷길",
            desc: "간썰물 때만 열리는 바닷길을 따라 걸으며 특별한 풍경을 만나는 체험",
          },
          { name: "선재어촌체험마을", desc: "어촌의 일상을 직접 경험해보는 체험 프로그램" },
          { name: "뻘다방", desc: "갯벌 풍경을 바라보며 여유를 즐기는 휴식 공간" },
        ],
      },
    ],
  },

  photo: {
    id: "photo",
    label: "사진 명소",
    icon: "assets/icons/theme/photo.svg",
    placesTitle: "추천장소",
    cards: [
      {
        name: "소청도",
        desc: "이국적인 풍경을 담은 섬",
        images: [
          "assets/images/theme/theme-photo.webp",
          "assets/images/course/overnight-daecheongdo.webp",
          "assets/images/theme/theme-nature.webp",
        ],
        places: [
          {
            name: "분바위",
            desc: "하얀 규암 절벽과 푸른 바다가 만들어내는 이국적인 풍경",
          },
          {
            name: "스트로마톨라이트",
            desc: "10억 년의 지질 흔적이 남은 천연기념물 포토스팟",
          },
          { name: "소청도 등대", desc: "등대와 푸른 바다가 어우러진 감성 풍경" },
        ],
      },
      {
        name: "굴업도",
        desc: "자연 그대로의 풍경을 간직한 섬",
        images: [
          "assets/images/theme/theme-nature.webp",
          "assets/images/theme/theme-photo.webp",
          "assets/images/theme/theme-sea.webp",
        ],
        places: [
          {
            name: "개머리언덕",
            desc: "푸른 초원과 바다가 한 폭의 그림처럼 펼쳐지는 굴업도의 대표 명소",
          },
          {
            name: "낭개머리",
            desc: "탁 트인 전망과 일출·일몰 풍경으로 사진 애호가들에게 사랑받는 장소",
          },
          {
            name: "목기미해변",
            desc: "고운 백사장과 맑은 바다가 어우러진 굴업도의 숨은 포토스팟",
          },
        ],
      },
      {
        name: "영흥도",
        desc: "노을이 가장 아름다운 섬",
        images: [
          "assets/images/course/day-trip-yeongheungdo.webp",
          "assets/images/theme/theme-photo.webp",
          "assets/images/theme/theme-sea.webp",
        ],
        places: [
          { name: "노가리해변", desc: "붉은 절벽과 해식동굴이 만들어내는 독특한 풍경" },
          {
            name: "십리포 노을전망",
            desc: "붉게 물드는 서해 노을을 감상하며 감성적인 사진을 남기기 좋은 장소",
          },
          {
            name: "영흥대교 전망 포인트",
            desc: "바다 위를 가로지르는 영흥대교와 서해 풍경을 함께 담을 수 있는 전망 명소",
          },
        ],
      },
    ],
  },
};

window.THEME_TRAVEL_ORDER = ["nature", "beach", "history", "activity", "photo"];
