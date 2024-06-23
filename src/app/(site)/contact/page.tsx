import { useSession } from "next-auth/react";
import Container from "@/app/components/Container";
import Form from "@/app/components/contact/Form";
import Banner from "@/app/components/Banner"
export default function Contact() {
  return (
    <>
      <Banner title="Contactează-ne" />
      <Container className="p-10 bg-pale_dogwood">
        <div className="bg-tiffany_blue p-10 grid grid-cols-2 rounded-3xl">
          <div className="col-span-2 lg:col-span-1">
            <h1 className="font-poppins font-bold text-xl lg:text-3xl text-black text-center p-10">
              Bine ai venit la pagina noastră de contact!
            </h1>
            <p className="font-poppinslight text-gray-700 font-bold">
              Ne bucurăm să fim la dispoziția ta pentru orice întrebări,
              sugestii sau colaborări. Folosește formularul alaturat pentru a ne
              trimite un mesaj și vom reveni la tine în cel mai scurt timp
              posibil.
              <div className="mt-5">Nu ezita să ne scrii pentru:</div>
              <ul className="m-3">
                <li>Colaborări sau parteneriate</li>
                <li>Consultanță în alegerea tiparelor de croitorie</li>
                <li>Nelamuriri in legatura cu tutorialele sau tiparele</li>
              </ul>
              Echipa Croitoresele Fericite îți mulțumește pentru interesul
              acordat și așteaptă cu nerăbdare să te ajute să explorezi pasiunea
              pentru croitorie într-un mod unic si inedit.
            </p>
          </div>
          <div className="col-span-2 lg:col-span-1 lg:p-10">
            <Form />
          </div>
        </div>
      </Container>
    </>
  );
}
