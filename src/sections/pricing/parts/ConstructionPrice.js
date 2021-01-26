import React, { useMemo } from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import styled from 'styled-components';
import {graphql, useStaticQuery} from 'gatsby'
// import PropTypes from 'prop-types'
import { secondaryMain } from '../../../constants/color';


const Table = styled(BootstrapTable)`
    color: #fff;
    & > tbody > tr {
        &:hover {
            color: ${secondaryMain}
        }
    }
    margin-top: 32px;
`;

const BoldText = styled.span`
    font-weight: bold;
    color: ${secondaryMain};
`
const createEmptyTd = amount => {
    const result = [];
    for (let index = 0; index < amount; index++) {
       result.push(<td key={`empty-key-${index}`} />); 
    }
    return result;
}

function ConstructionPrice(props) {
    const data = useStaticQuery(graphql`
        query {
            content: markdownRemark(fileAbsolutePath:{regex:"/pricing/constructions/"})
            {
                frontmatter {
                    constructId
                    constructionPrices
                }
            }
        }
    `);
    const dataTable = useMemo(() => data.content.frontmatter.constructionPrices, [data]);
    const headerData = useMemo(() => dataTable[0], [dataTable]);
    const restData = useMemo(() => dataTable.slice(1, dataTable.length), [dataTable]);
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {headerData.map((rowContent, index) => <th key={`row-content-${index}`}>{rowContent}</th>)}
                </tr>
            </thead>
            <tbody>
                {restData.map((rowDataArr, index) => (
                    <tr key={`row-data-arr-${index}`}>
                        {rowDataArr.length > 1 ? rowDataArr.map((dataRow, index) => <td key={`data-row-${index}`}>{dataRow}</td>) : (
                            <>
                                <td><BoldText>{rowDataArr[0]}</BoldText></td>
                                {createEmptyTd(headerData.length - 1)}
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ConstructionPrice

