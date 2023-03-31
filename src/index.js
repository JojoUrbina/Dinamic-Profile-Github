import Template from '@templates/Template.js';
import "@styles/main.css";//se debe agregar aca para poder visualizar ls estilos
import "@styles/vars.styl";//se instalo , luego se agrego en el webpack config
(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
