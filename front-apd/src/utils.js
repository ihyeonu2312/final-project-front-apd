// ✅ 카테고리 이름을 URL-friendly한 slug로 변환하는 함수
export const convertToSlug = (text) => {
  return text
    .replace(/\s+/g, "-")  // 공백을 "-"로 변환
    .replace(/\//g, "-")   // 슬래시(`/`)를 "-"로 변환
    .toLowerCase();        // 소문자로 변환
};

