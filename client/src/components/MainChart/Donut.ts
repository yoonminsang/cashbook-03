const Donut = (data) => {
  if (!data) return;

  let filled = 0;
  let str = '';
  data.forEach(({ category_color, percentage }) => {
    const startAngle = -90,
      radius = 30,
      cx = 50,
      cy = 50,
      animationDuration = 2000,
      strokeWidth = 15,
      dashArray = 2 * Math.PI * radius,
      dashOffset = dashArray * (1 - percentage / 100),
      angle = (filled * 360) / 100 + startAngle,
      currentDuration = (animationDuration * percentage) / 100,
      delay = (animationDuration * filled) / 100;

    str += `
    <circle
        cx="${cx}"
        cy="${cy}"
        r="${radius}"
        stroke="${category_color}"
        stroke-width="${strokeWidth}"
        fill="transparent"
        stroke-dasharray="${dashArray}"
        stroke-dashoffset="${dashOffset}"
        transition="stroke-dashoffset ${currentDuration}ms linear ${delay}ms";
        transform="rotate(${angle} ${cx} ${cy})",
    />
  `;
    //   circle.style.transition =
    //   "stroke-dashoffset " + currentDuration + "ms linear " + delay + "ms";
    //   setTimeout(() => {
    //     circle.style['stroke-dashoffset'] = dashOffset;
    //   }, 100);
    filled += percentage;
  });
  return str;
};

export default Donut;
