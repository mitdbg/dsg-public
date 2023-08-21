import React from "react"

function shuffle(items) {
  const shuffled = [...items]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled
};

const RandomOrder = ({items}) => {
  const ordering = shuffle(items);
  return (<>{ordering.join(", ")}</>)
}

export default RandomOrder;
