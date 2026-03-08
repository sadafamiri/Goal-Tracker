export const DataGoal = [
  {
    id: 1,
    title: "Learn React",
    category: "Study",
    progress: 5,
    target: 20
  }
];

export function getPosts(id) {
  return DataGoal.find((p) => p.id === Number(id));
}