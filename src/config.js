export const config = {
  name: "Bestatter",
  phone: "+494060943946",
  phoneDisplay: "040 60 94 39 46",
  email: "mail@alstercloud.de",
  address: { street: "Winterhuder Weg 31", city: "22085 Hamburg" },
  calendly: "",
};

export const routeUrl =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent(`${config.address.street}, ${config.address.city}`);
