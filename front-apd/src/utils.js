// ✅ 카테고리 이름을 URL-friendly한 slug로 변환하는 함수
export const convertToSlug = (name) => {
  return encodeURIComponent(name.replace(/\s+/g, "-").toLowerCase());
};
