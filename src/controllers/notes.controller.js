import Note from "../models/Note.js";
import { Transporter } from "../config/mailer.js";



export const renderNoteForm = (req, res) => {

  if (req.user.tipo_usuario == "Visitador")
  {  const tp = true;
    const fm = false;
  res.render("notes/new-note", { name:req.user.name , apellido:req.user.apellido, direccion:req.user.direccion, calle:req.user.calle,
  barrio:req.user.ciudad_barrio, tp, fm});
}
else {
req.flash("success_msg", "Usuario no puede Cargar Medicos");
res.redirect("/notes");
};
};
export const createNewNote = async (req, res) => {



  const { title, description,   direccion, calle, barrio, celular, email, registro, num_doc, horario_ent } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0)
    return res.render("notes/new-note", {
      errors,
      title,
      description,
    });

  const newNote = new Note({ title, description,   direccion, calle, barrio, celular, email, registro, num_doc, horario_ent});
  newNote.user = req.user.id;
  newNote.visitador = req.user.name+" "+req.user.apellido;
  newNote.estatus = "Pendiente";
  await newNote.save();
  req.flash("success_msg", "Medico Agregado Satisfactoriamente");

  

  //envio del email a farmacia
  const contentHtml = `
  <h1> Datos del Medico Ingresado al Programa </h1>
  <ul> 
      <li> Nombre: ${title} </li>
      <li> Apellido: ${description}</li>
      <li> Registro: ${registro}</li>
      <li> RUC: ${num_doc}</li>
      <li> Celular: ${celular}</li>
      <li> Email: ${email}</li>
      <li> Direccion: ${direccion}</li>
      <li> Calle que Cruzaa: ${calle}</li>
      <li> Ciudad o Barrio: ${barrio}</li>
      <li> Hora de Entrega: ${horario_ent}</li>

      </ul>
  `;
  
  console.log(contentHtml);
  await Transporter.sendMail({
  from: 'admsuprachat@gmail.com', // sender address ADMIN
  to: 'jlopez@gdintegral.com' ,  // RECIVER address FARMACIA
  subject: "Ingreso de Medico al Programa Suprahyal", // Subject line
  html: contentHtml, // html body
});

  //envio del email al medico
  const contentHtml1 = `
  <h1> Datos de la farmacia Para Ingresar al Programa Suprahyal</h1>
  <p> Estimado(a) Dr(a) ${title} ${description} </p>
  <p> Reciba la mas cordial bienvenida de parte de Un cordial saludo & Farmacenter  al programa SUPRACHAT </p>
  <p> Con el fin de comenzar a realizar sus pedidos, por favor, escriba a la línea exclusiva de WhatsApp +959976580260, donde lo atenderán gustosamente para aplica los beneficios del programa.  </p>
  
  <p> Sin más, por de pronto, y esperando poder servirle en breve.</p>
  <p> Un cordial saludo </p>
  <p> ${req.user.name+" "+req.user.apellido} </p>
  <p> Visitador Medico de Fapasa - Adium  </p>
  
  `;
  
  console.log(contentHtml1);
  await Transporter.sendMail({
  from: 'admsuprachat@gmail.com', // sender address ADMIN
  to: email ,  // RECIVER address FARMACIA
  subject: "Ingreso de Medico al Programa Suprahyal", // Subject line
  html: contentHtml1, // html body
});






//
  res.redirect("/notes");
  };


export const renderNotes = async (req, res) => {
 
  const pass = req.user.cambio_password;
 const user = null;
  if (pass == "0"){ res.render("auth/changepassw", {  usuario:req.user.usuario,  user  }) }
  else
   { 
  const tip = req.user.tipo_usuario;
    if (tip == "Visitador"){
  const tp = true;
  const fm = false;
  const notes = await Note.find({ user: req.user.id })

    .sort({ date: "desc" })
    .lean();

    res.render("notes/all-notes", { notes, name:req.user.name,  tp, fm  });
  
} 

else if (tip == "Farmacia") { 
  const tp = false;
  const fm = true;
  const pd = "Pendiente";
  const notes = await Note.find({estatus: pd})

  .sort({ date: "desc" })
  .lean();

res.render("notes/all-notes", { notes ,name:req.user.name,  tp, fm });
}
else
{
  const tp = false;
  const fm = false;
  const notes = await Note.find()
  .sort({ date: "desc" })
  .lean();

res.render("notes/all-notes", { notes ,name:req.user.name,  tp, fm });
};
};
};

export const renderEditForm = async (req, res) => {
  const tp = false;
  const fm = true;
  const note = await Note.findById(req.params.id).lean();

  res.render("notes/edit-note", { note, tp, fm });
};

export const updateNote = async (req, res) => {
  const { title, description,
    factura_num,
    factura_name,
    factura_id,
    factura_monto, estatus, cant_despachada  } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description,
    factura_num,
    factura_name,
    factura_id,
    factura_monto,
    estatus, cant_despachada });

  req.flash("success_msg", "Medico Actualizado Satisfactoriamente");
  //envio del email al Doctor
  const contentHtml = `
  <h1> Datos del Medico </h1>
  <ul> 
      <li> Doctor: ${title}</li>
      <li> medicamento: ${req.body.medicamento}</li>
      <li> Cantidad Facturada: ${cant_despachada}</li>
      <li> Numero Factura: ${factura_num}</li>
      <li> Monto Factura: ${factura_monto}</li>
      <li> direccion de entrega: ${req.body.direccion}</li>
      <li> Horario de entreda: ${req.body.horario}</li>
      </ul>
  `;
    

  console.log(contentHtml);
  await Transporter.sendMail({
  from: 'jlopez@gdintegral.com', // sender address ADMIN
  to: 'jlopez@gdintegral.com' ,  // RECIVER address FARMACIA
  subject: "Envio de Pedido Suprahyal", // Subject line
  html: contentHtml, // html body
});

  res.redirect("/notes");
};



export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Medico Borrado Satisfactoriamente");
  res.redirect("/notes");
};

import PdfkitConstruct from "pdfkit-construct";
import User from "../models/User.js";
export const imprimirNote = async (req, res) => {
  const pedi = await Note.find()
  .sort({ date: "desc" })
  .lean();

            const doc = new PdfkitConstruct({
            size: 'letter',
            margins: {top: 20, left: 10, right: 10, bottom: 20},
            bufferPages: true});

            // set the header to render in every page
            doc.setDocumentHeader({}, () => {


     //         doc.lineJoin('miter')
     //             .rect(0, 0, doc.page.width, doc.header.options.heightNumber).fill("#ededed");

              doc.fill("#115dc8")
                  .fontSize(20)
                  .text("Fapasa", {align: 'center'});
              doc.fill("#115dc8")
                  .fontSize(18)
                  .text("Medicos Ingresados al Sistema", {align: 'center'});

          });



            // add a table (you can add multiple tables with different columns)
            // make sure every column has a key. keys should be unique
            doc.addTable(
              [
                {key: 'visitador', label: 'Visitador', align: 'left'},
                {key: 'title', label: 'Doctor', align: 'left' },
                  {key: 'description', label: '', align: 'left'},
                  {key: 'registro', label: 'Registro', align: 'left'},
                  {key: 'celular', label: 'Celular', align: 'left'},
                  {key: 'email', label: 'Email', align: 'left'},

              ],
              pedi, {
                  border: null,
                  width: "fill_body",
                  striped: true,
                  stripedColors: ["#f6f6f6", "#d6c4dd"],
                  cellsPadding: 10,
                  marginLeft: 45,
                  marginRight: 45,
                  headAlign: 'left'
              });

             // set the footer to render in every page
            doc.setDocumentFooter({}, () => {

              //         doc.lineJoin('miter')
              //             .rect(0, doc.footer.y, doc.page.width, doc.footer.options.heightNumber).fill("#c2edbe");
         
                       doc.fill("#7416c8")
                           .fontSize(8)
                           .text("Fapasa-Webapp", doc.footer.x, doc.footer.y + 10);
                   });
          // render tables
          doc.render();
            // this should be the last
            // for this to work you need to set bufferPages to true in constructor options 
            //doc.setPageNumbers((p, c) => `Page ${p} of ${c}`, "bottom right");
            doc.pipe(res);
            doc.end();
        
};
