export const registrarFecha = (dt) => {
  const fecha = new Date(dt * 1000);
  const opciones = {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: '2-digit',
  };

  return {
    fecha: fecha.toLocaleString('en-EN', opciones),
    day: fecha.toLocaleString('en-EN', {
      weekday: 'long',
    }),
  };
};

export const formatTemp = (temp, change) => {
  let value = `${parseInt(temp - 273.15)}°C`;

  if (change) {
    value = `${parseInt((temp - 273.15) * 1.8 + 32)}°F`;
  }

  return value;
};
