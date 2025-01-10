import download from "downloadjs";
import loadPdf from './pdfLoader';

const GenerateFilledPDF = async function (btnType, formData, pagesKept) {
  // Fetch the PDF with form field
  const {pdfDoc, form} = await loadPdf();
  //-------- Get PDF Fields by machine name ------------------
  const citizen = form.getRadioGroup('citizen');
  const eighteenYearsOld = form.getRadioGroup('eighteen_years');
  const title = form.getRadioGroup('salutation');
  const firstName = form.getTextField('first_name');
  const middleNames = form.getTextField('middle_names');
  const lastName = form.getTextField('last_name');
  const suffix = form.getRadioGroup('suffix');

  const title2 = form.getRadioGroup('salutation_2');
  const firstName2 = form.getTextField('first_name_2');
  const middleNames2 = form.getTextField('middle_names_2');
  const lastName2 = form.getTextField('last_name_2');
  const suffix2 = form.getRadioGroup('suffix_2');

  const dobMonth = form.getTextField('dob_month');
  const dobDay = form.getTextField('dob_day');
  const dobYear = form.getTextField('dob_year');
  const phoneNumber = form.getTextField('telephone_number');
  const race = form.getTextField('race_ethnic_group');

  const homeAddress = form.getTextField('home_address');
  const aptNumber = form.getTextField('apt_lot_number');
  const city = form.getTextField('city');
  const state = form.getTextField('state');
  const zipcode = form.getTextField('zip_code');

  const mailAddress = form.getTextField('mail_address');
  const mailCity = form.getTextField('mail_city');
  const mailState = form.getTextField('mail_state');
  const mailZipcode = form.getTextField('mail_zip_code');

  const prevAddress = form.getTextField('prev_address');
  const prevAptNumber = form.getTextField('prev_apt_lot_number');
  const prevCity = form.getTextField('prev_city');
  const prevState = form.getTextField('prev_state');
  const prevZipcode = form.getTextField('prev_zip_code');

  const idNumber = form.getTextField('id_number');
  const politicalParty = form.getTextField('choice_of_party');

  // -----------Fill in the pdf fields--------------------------
  // (1) Personal Information
  //Citizen and age
  citizen.select('yes');
  eighteenYearsOld.select('yes');

  //Current Name
  if (formData.current_title) {
    title.select(formData.current_title);
  }
  firstName.setText(formData.current_first_name);
  middleNames.setText(formData.current_middle_names);
  lastName.setText(formData.current_last_name);

  //Current suffix
  if (formData.current_suffix) {
    suffix.select(formData.current_suffix);
  }

  //Previous Name
  if (formData.prev_title) {
    title2.select(formData.prev_title);
  }
  firstName2.setText(formData.prev_first_name);
  middleNames2.setText(formData.prev_middle_names);
  lastName2.setText(formData.prev_last_name);

  //Previous suffix
  if (formData.prev_suffix) {
    suffix2.select(formData.prev_suffix);
  }

  //Date of Birth, Phone, Race
  dobMonth.setText(formData.date_of_birth_month);
  // adjusting font size
  dobMonth.setFontSize(12)
  dobDay.setText(formData.date_of_birth_day);
  // adjusting font size
  dobDay.setFontSize(12)
  dobYear.setText(formData.date_of_birth_year);
  // adjusting font size
  dobYear.setFontSize(5)
  phoneNumber.setText(formData.phone_number);
  race.setText(formData.race_ethnic_group);

  //(2) Addresses
  //Home
  const currentAddress = formData.current_street_address + formData.current_apt_number + formData.current_city + formData.current_zip_code;
  //check if anything other than default state selection is filled out
  if (currentAddress) {
    homeAddress.setText(formData.current_street_address);
    aptNumber.setText(formData.current_apt_number);
    city.setText(formData.current_city);
    state.setText(formData.current_state);
    zipcode.setText(formData.current_zip_code);
  }

  //Mail
  mailAddress.setText(`${formData.mail_street_address} ${formData.mail_apt_number}`);
  mailCity.setText(formData.mail_city);
  mailState.setText(formData.mail_state);
  mailZipcode.setText(formData.mail_zip_code);
  //Previous
  //Maine override
  if ((formData.current_state == 'Maine') && (formData.prev_street_address == '')) {
    prevAddress.setText('N/A');
  } else {
    prevAddress.setText(formData.prev_street_address);
  }
  prevAptNumber.setText(formData.prev_apt_number);
  prevCity.setText(formData.prev_city);
  prevState.setText(formData.prev_state);
  prevZipcode.setText(formData.prev_zip_code);

  //(3) Identification
  //No id or ssn
  if ((formData.id_number === '') && (formData.ssn_number === '')) {
    idNumber.setText("None");
    //Both id and ssn
  } else if ((formData.id_number != '') && (formData.ssn_number != '')) {
    idNumber.setText(formData.id_number + ", " + formData.ssn_number);
    //Id or ssn
  } else {
    idNumber.setText(formData.id_number + formData.ssn_number);
  }

  //(4) Political Party
  politicalParty.setText(formData.party_choice);

  //-------------End PDF Fill---------------

// Remove unneccessary pages
  let shift = 0;
  const totalPages = pdfDoc.getPageCount();
  let pageCount = totalPages;
  let pagesKeptArray = pagesKept.split(',');

// Check if pagesKept is empty or undefined
  if (!pagesKept || pagesKept.trim() === '') {
    // If pagesKept is empty, render the full PDF
    pagesKeptArray = Array.from({length: totalPages}, (_, i) => i.toString());
  }

  for (let i = 0; i < totalPages; i++) {
    if (!pagesKeptArray.includes(i.toString())) {
      pdfDoc.removePage(i - shift);
      shift++;
      pageCount--;
    }
  }

  // Rearrange pages
  const genInstrutPages = pagesKeptArray.splice(0, 2);
  pagesKeptArray.splice(2, 0, genInstrutPages[0], genInstrutPages[1]);

  const reorderPages = (pdfDoc, newOrder) => {
    const pages = pdfDoc.getPages();
    for (let currentPage = 0; currentPage < newOrder.length; currentPage++) {
      pdfDoc.removePage(currentPage);
      pdfDoc.insertPage(currentPage, pages[newOrder[currentPage]]);
    }
  };

  reorderPages(pdfDoc, pagesKeptArray);

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save()


  if (btnType === 'newTab') {
    // Trigger the browser to open a new tab with the PDF document
    var blobURL = URL.createObjectURL(new Blob([pdfBytes], {type: 'application/pdf'}));
    window.open(blobURL);
  } else if (btnType === 'download') {
    // Trigger the browser to download the PDF document
    download(pdfBytes, `national_voter_registration_form_${formData.state}.pdf`, "application/pdf");
  }
}

export default GenerateFilledPDF;