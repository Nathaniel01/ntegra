import React from 'react';
import { render } from '@testing-library/react';
import DataTable from '../src/components/DataTable';

test('renders table', () => {
    render(<DataTable />);
});

