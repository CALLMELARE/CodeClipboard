/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Converter from '../utils/converter';

import ResultCard from './ResultCard';
import ResultPart from './ResultPart';

function ResultMatrix({ origin = '' }) {
    const [matrix, setMatrix] = useState();

    // store
    const { matrixMenu, matrixBlackList } = useSelector((s) => s.matrix);

    const MatrixRender = useCallback(
        (data, origin) =>
            data.map((item) => {
                if (item.children) {
                    return <ResultPart label={item.text}>{MatrixRender(item.children, origin)}</ResultPart>;
                } else if (matrixBlackList.indexOf(item.code) === -1) {
                    return <ResultCard label={item.text} text={Converter({ code: item.code, origin })} />;
                }

                return null;
            }),
        [matrixBlackList],
    );

    useEffect(() => {
        setMatrix(MatrixRender(matrixMenu, origin));
    }, [MatrixRender, matrixBlackList, matrixMenu, origin]);

    return <div className="tc-result-matrix">{matrix}</div>;
}

export default ResultMatrix;
