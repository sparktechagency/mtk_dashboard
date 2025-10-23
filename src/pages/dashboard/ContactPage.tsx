import ContactList from "../../components/contact/ContactList"


const ContactPage = () => {
  return (
    <>
      <div className="min-h-full bg-white rounded-md shadow">
          <div className="w-full h-full flex flex-col">
              <ContactList />
          </div>
      </div>
    </>
  )
}

export default ContactPage