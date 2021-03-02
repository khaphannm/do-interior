import React from 'react';
import Layout  from './src/components/layout' // change the import statement to reflect where your layout component is obviously

export const wrapPageElement = ({element}) => <Layout>{element}</Layout>