
import { getBusses } from './hsl';

console.log('Hello console!');

document.getElementById('karanristiEast').addEventListener('click', () => {getBusses(2132208);});
document.getElementById('karanristiWest').addEventListener('click', () => {getBusses(2132207);});
document.getElementById('landerannantie').addEventListener('click', () => {getBusses(2133225);});
document.getElementById('karamalmensWest').addEventListener('click', () => {getBusses(2132225);});
document.getElementById('karamalmensEast').addEventListener('click', () => {getBusses(2132226);});
//getBusses(2132207);
