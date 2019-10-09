import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableFooter, TableRow, TablePagination } from '@material-ui/core';

export default function Pagination(props) {
    const {
        count,
        onChange,
        rowsPerPageOptions,
        rowsPerPage: propRowsPerPage,
        page: propPage,
    } = props;
    const [rowsPerPage, setRowsPerPage] = useState(propRowsPerPage);
    const [page, setPage] = useState(propPage);

    useEffect(() => {
        onChange({ page, size: rowsPerPage });
    }, [rowsPerPage, page, onChange]);

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    style={{ border: 'none' }}
                    rowsPerPageOptions={rowsPerPageOptions}
                    rowsPerPage={rowsPerPage}
                    count={count}
                    page={page}
                    onChangePage={(e, page) => setPage(page)}
                    onChangeRowsPerPage={(e) => setRowsPerPage(e.target.value)}
                />
            </TableRow>
        </TableFooter>
    );
}

Pagination.defaultProps = {
    rowsPerPageOptions: [5, 10, 25],
    rowsPerPage: 10,
    page: 0,
};

Pagination.propTypes = {
    count: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
};
