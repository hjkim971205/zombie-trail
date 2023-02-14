export default function rollNumber(min, max) { // Maximum amount one can roll and lowest they can roll.
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * max + min);
}