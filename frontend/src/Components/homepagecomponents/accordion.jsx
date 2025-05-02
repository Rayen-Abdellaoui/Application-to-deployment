
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

export default function ACCORD() {

  return (
    <MDBAccordion  >
      <MDBAccordionItem collapseId={1} headerTitle='Why do I do if the workshop is already full?' >
        <strong>Don't worry!</strong> Even if the workshop is already full you can simply wishlist it and you will be automatically enrolled and notified as soon as there is a vacancy.
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={2} headerTitle='Can anybody set up their own workshop?'>
        <strong>It is really simple!</strong> All you have to do is sign in with an admin account, fill in the necessary information and we will take care of the rest
      </MDBAccordionItem>
      <MDBAccordionItem collapseId={3} headerTitle='I am having issues with my account how do i fix this?'>
        <strong>Contact us Immediately!</strong> You will find our contact info below, try to rach out to us and we will respond within reasonable time
      </MDBAccordionItem>
    </MDBAccordion>
  );
}