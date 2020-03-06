import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Axios from 'axios';
import Cabecera from './Cabecera';
import { fetchCabecera } from '../../../store/ducks/cabeceras';

const CabeceraBuilder = () => {
  const [pop, setPop] = useState({
    novistasSAG1: 0, novistasSAG2: 0, novistasFlot: 0, novistas5toMolino: 0,
  });
  const dispatch = useDispatch();

  const payload = useSelector((state) => state.cabeceras.payload);
  const loading = useSelector((state) => state.cabeceras.loading);

  const fetchPops = async () => {
    const response = await Axios.get('http://10.18.18.235:3002/get_mostrar_pop_modos_cantidades');
    if (response.data.length > 0) {
      setPop(response.data[0]);
    }
  };

  useEffect(() => {
    dispatch(fetchCabecera());
    fetchPops();
    setInterval(() => {
      dispatch(fetchCabecera());
      fetchPops();
    }, 60000);
  }, []);

  return (
    <>
      <Cabecera pop={pop.novistasSAG1} name="MOLINO 1" modelo="SAG1" tag="MA2:3WIC110" varName="SAG 16" opt={payload.sag1opt} pred={payload.sag1pred} real={payload.sag1real} loading={loading} />
      <Cabecera pop={pop.novistasSAG2} name="MOLINO 2" modelo="SAG2" tag="MA2:3WIC210" varName="SAG 17" opt={payload.sag2opt} pred={payload.sag2pred} real={payload.sag2real} loading={loading} />
      <Cabecera pop={pop.novistasFlot} name="MOLINO 3" modelo="flotacion" tag="" varName="RECUPERACIÓN" opt={payload.recopt} pred={payload.recpred} real={payload.recreal} loading={loading} />
      {/* <Cabecera pop={pop.novistas5toMolino} name="MOLINO 4" modelo="mobo19" tag="MA2:3WIC0126" varName="MoBo 19" opt={payload.mobo16opt} real={payload.mobo16real} loading={loading} /> */}
    </>
  );
};

export default CabeceraBuilder;
