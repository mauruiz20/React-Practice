import { useMemo } from 'react';

export default function useRows() {
  const rows = useMemo(
    () => [
      {
        marca: 'Audi',
        modelo: 'A3',
        segmento: 'Sedan, Convertible',
        anio: '2015',
      },
      {
        marca: 'Audi',
        modelo: 'A3',
        segmento: 'Wagon',
        anio: '2013',
      },
      {
        marca: 'Audi',
        modelo: 'A3 Sportback e-tron',
        segmento: 'Wagon',
        anio: '2016',
      },
      {
        marca: 'Audi',
        modelo: 'A4',
        segmento: 'Sedan, Convertible',
        anio: '2006',
      },
      {
        marca: 'Audi',
        modelo: 'A4',
        segmento: 'Sedan, Wagon',
        anio: '2001',
      },
      {
        marca: 'Audi',
        modelo: 'A4 allroad',
        segmento: 'Wagon',
        anio: '2019',
      },
      {
        marca: 'Audi',
        modelo: 'A5',
        segmento: 'Coupe',
        anio: '2008',
      },
      {
        marca: 'Audi',
        modelo: 'A5 Sport',
        segmento: 'Convertible, Coupe',
        anio: '2017',
      },
      {
        marca: 'Audi',
        modelo: 'Q3',
        segmento: 'SUV',
        anio: '2020',
      },
      {
        marca: 'Audi',
        modelo: 'R8',
        segmento: 'Coupe',
        anio: '2008',
      },
      {
        marca: 'Audi',
        modelo: 'TT',
        segmento: 'Coupe',
        anio: '2019',
      },
      {
        marca: 'Audi',
        modelo: 'Q7',
        segmento: 'SUV',
        anio: '2015',
      },
      {
        marca: 'Audi',
        modelo: 'Q8',
        segmento: 'SUV',
        anio: '2019',
      },
      {
        marca: 'Audi',
        modelo: 'Cabriolet',
        segmento: 'Convertible, Coupe',
        anio: '1996',
      },
    ],
    []
  );

  return rows;
}
