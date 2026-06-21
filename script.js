const officialCafeUrl = "https://cafe.naver.com/";
const placeholderKakaoUrl = "https://open.kakao.com/o/example";

const guilds = [
  {
    id: "authentic",
    name: "Authentic",
    intro: "활발하게 운영 중인 대형 길드입니다. 가입 조건과 운영진 정보가 공개되어 있습니다.",
    members: 100,
    capacity: 100,
    status: "open",
    kakao: placeholderKakaoUrl,
    requirements: {
      level: "20 이상",
      activity: "3일 미접속 시 추방",
      dealerSpec: "딜러 기준: 메인 MAX, 서브 2차 해방",
      supportSpec: "서폿 기준: 빙결 2차, 에그비 11, 부두 13"
    },
    meta: {
      master: "재히의검ジ",
      officers: "고양이ジ, 빙그레ジ, 세스코ジ, 오멘ジ",
      style: "대형 길드",
      contact: "카카오 오픈채팅 링크 등록 예정"
    },
    roster: [
      ["재히의검ジ", "길드장"],
      ["고양이ジ", "운영진"],
      ["빙그레ジ", "운영진"],
      ["세스코ジ", "운영진"],
      ["오멘ジ", "운영진"]
    ]
  },
  {
    id: "hanbu",
    name: "한부협회",
    intro: "활발하게 운영 중인 대형 길드입니다. 상세 가입 정보는 아직 준비중입니다.",
    members: 100,
    capacity: 100,
    status: "pending",
    kakao: placeholderKakaoUrl,
    requirements: {
      level: "정보 준비중",
      activity: "정보 준비중",
      dealerSpec: "정보 준비중",
      supportSpec: "정보 준비중"
    },
    meta: {
      master: "정보 준비중",
      officers: "정보 준비중",
      style: "대형 길드",
      contact: "정보 준비중"
    },
    roster: [["명단 준비중", "정보"]]
  },
  {
    id: "kofam",
    name: "코팸",
    intro: "활발하게 운영 중인 대형 길드입니다. 상세 가입 정보는 아직 준비중입니다.",
    members: 100,
    capacity: 100,
    status: "pending",
    kakao: placeholderKakaoUrl,
    requirements: {
      level: "정보 준비중",
      activity: "정보 준비중",
      dealerSpec: "정보 준비중",
      supportSpec: "정보 준비중"
    },
    meta: {
      master: "정보 준비중",
      officers: "정보 준비중",
      style: "대형 길드",
      contact: "정보 준비중"
    },
    roster: [["명단 준비중", "정보"]]
  },
  {
    id: "baby",
    name: "응애",
    intro: "활발하게 운영 중인 대형 길드입니다. 상세 가입 정보는 아직 준비중입니다.",
    members: 100,
    capacity: 100,
    status: "pending",
    kakao: placeholderKakaoUrl,
    requirements: {
      level: "정보 준비중",
      activity: "정보 준비중",
      dealerSpec: "정보 준비중",
      supportSpec: "정보 준비중"
    },
    meta: {
      master: "정보 준비중",
      officers: "정보 준비중",
      style: "대형 길드",
      contact: "정보 준비중"
    },
    roster: [["명단 준비중", "정보"]]
  },
  {
    id: "mingming",
    name: "밍밍단",
    intro: "활발하게 운영 중인 대형 길드입니다. 상세 가입 정보는 아직 준비중입니다.",
    members: 100,
    capacity: 100,
    status: "pending",
    kakao: placeholderKakaoUrl,
    requirements: {
      level: "정보 준비중",
      activity: "정보 준비중",
      dealerSpec: "정보 준비중",
      supportSpec: "정보 준비중"
    },
    meta: {
      master: "정보 준비중",
      officers: "정보 준비중",
      style: "대형 길드",
      contact: "정보 준비중"
    },
    roster: [["명단 준비중", "정보"]]
  },
  {
    id: "mandu",
    name: "만두교",
    intro: "활발하게 운영 중인 대형 길드입니다. 상세 가입 정보는 아직 준비중입니다.",
    members: 100,
    capacity: 100,
    status: "pending",
    kakao: placeholderKakaoUrl,
    requirements: {
      level: "정보 준비중",
      activity: "정보 준비중",
      dealerSpec: "정보 준비중",
      supportSpec: "정보 준비중"
    },
    meta: {
      master: "정보 준비중",
      officers: "정보 준비중",
      style: "대형 길드",
      contact: "정보 준비중"
    },
    roster: [["명단 준비중", "정보"]]
  }
];

let selectedGuildId = guilds[0].id;
let currentFilter = "all";

const guildCards = document.querySelector("#guildCards");
const searchInput = document.querySelector("#searchInput");
const filterButtons = document.querySelectorAll("[data-filter]");

document.querySelector("#officialCafeLink").href = officialCafeUrl;

function getStatusLabel(guild) {
  return guild.status === "open" ? "정보 공개" : "정보 준비중";
}

function renderSummary() {
  document.querySelector("#guildCount").textContent = guilds.length;
  document.querySelector("#memberCount").textContent = guilds.reduce((sum, guild) => sum + guild.capacity, 0);
  document.querySelector("#openCount").textContent = guilds.filter((guild) => guild.status === "open").length;
}

function getFilteredGuilds() {
  const query = searchInput.value.trim().toLowerCase();

  return guilds.filter((guild) => {
    const matchesFilter = currentFilter === "all" || guild.status === currentFilter;
    const searchable = [
      guild.name,
      guild.intro,
      ...Object.values(guild.requirements),
      ...Object.values(guild.meta),
      ...guild.roster.flat()
    ].join(" ").toLowerCase();

    return matchesFilter && searchable.includes(query);
  });
}

function renderGuildCards() {
  const filteredGuilds = getFilteredGuilds();

  if (!filteredGuilds.some((guild) => guild.id === selectedGuildId) && filteredGuilds[0]) {
    selectedGuildId = filteredGuilds[0].id;
  }

  guildCards.innerHTML = filteredGuilds
    .map((guild) => `
      <button class="guild-card ${guild.id === selectedGuildId ? "active" : ""}" type="button" data-id="${guild.id}">
        <h3>${guild.name}</h3>
        <p>${guild.intro}</p>
        <div class="card-meta">
          <span class="chip">${guild.members}/${guild.capacity}명</span>
          <span class="chip">레벨 ${guild.requirements.level}</span>
          <span class="status ${guild.status}">${getStatusLabel(guild)}</span>
        </div>
      </button>
    `)
    .join("");

  if (filteredGuilds.length === 0) {
    guildCards.innerHTML = `<div class="empty-state">검색 결과가 없습니다.</div>`;
  }

  guildCards.querySelectorAll(".guild-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedGuildId = card.dataset.id;
      render();
    });
  });
}

function renderDetail() {
  const guild = guilds.find((item) => item.id === selectedGuildId) || getFilteredGuilds()[0] || guilds[0];
  const status = document.querySelector("#detailStatus");
  const kakaoButton = document.querySelector("#detailKakao");

  status.textContent = getStatusLabel(guild);
  status.className = `status ${guild.status}`;
  document.querySelector("#detailName").textContent = guild.name;
  document.querySelector("#detailIntro").textContent = guild.intro;
  kakaoButton.href = guild.kakao;
  kakaoButton.textContent = guild.status === "open" ? "카카오 문의" : "링크 준비중";
  kakaoButton.classList.toggle("disabled", guild.status !== "open");

  document.querySelector("#requirements").innerHTML = Object.entries({
    레벨: guild.requirements.level,
    활동: guild.requirements.activity,
    "딜러 스펙": guild.requirements.dealerSpec,
    "서폿 스펙": guild.requirements.supportSpec
  })
    .map(([label, value]) => `<div class="info-row"><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");

  document.querySelector("#guildMeta").innerHTML = Object.entries({
    길드장: guild.meta.master,
    운영진: guild.meta.officers,
    규모: guild.meta.style,
    문의: guild.meta.contact
  })
    .map(([label, value]) => `<div class="info-row"><dt>${label}</dt><dd>${value}</dd></div>`)
    .join("");

  document.querySelector("#rosterCount").textContent = `${guild.members}/${guild.capacity}명`;
  document.querySelector("#roster").innerHTML = guild.roster
    .map(([name, role]) => `<div class="member"><strong>${name}</strong><span>${role}</span></div>`)
    .join("");
}

function render() {
  renderSummary();
  renderGuildCards();
  renderDetail();
}

searchInput.addEventListener("input", render);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

render();
