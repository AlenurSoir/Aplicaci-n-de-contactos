const form = document.getElementById('contactoForm');
    const listaContactos = document.getElementById('contactoList');
  let contactos =[];
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      agregarContacto();
    });
  
    
  
    function editarContacto(button) {
      const li = button.parentNode;
      const nombre = li.querySelector('strong').textContent;
      const telefono = li.textContent.split(' - ')[1].split(' - ')[0];
      const email = li.textContent.split(' - ')[2].trim();
  
      alert(`Editar contacto:\nNombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}`);
    }
  
    function eliminarContacto(contact) {
        const tel = contact.parentNode.id;
      let index = contactos.findIndex((e)=>e.telefono==tel)
      if(!!index||index==0){
        contactos = contactos.filter((e)=>e.telefono!=tel)
        pintar_datos()
        localStorage.setItem('contactos',JSON.stringify(contactos))
      }
    }
function agregarContacto() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    if (nombre && telefono && email) {
      const nuevoContacto = { nombre, telefono, email };
      
      contactos.push(nuevoContacto);

      localStorage.setItem('contactos',JSON.stringify(contactos))
      pintar_datos();
      form.reset();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  function recuperar_datos(){
    contactos = JSON.parse(localStorage.getItem('contactos'));
    pintar_datos();
  }
  function pintar_datos (){
    listaContactos.innerHTML ='';
    contactos.forEach(e=>{
        listaContactos.insertAdjacentHTML('beforeend',`
        <li id="${e.telefono}">
        <strong>${e.nombre}</strong> - ${e.telefono} - ${e.email}
        <button onclick="editarContacto(this)">Editar</button>
        <button onclick="eliminarContacto(this)">Eliminar</button>
        </li>
      `)
    })
  }
  recuperar_datos();
