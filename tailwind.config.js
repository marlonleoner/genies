/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                koromiko: {
                    50: '#fef8ee',
                    100: '#fdf0d7',
                    200: '#fbdead',
                    300: '#f7c06e',
                    400: '#f4a343',
                    500: '#f0871f',
                    600: '#e16d15',
                    700: '#bb5313',
                    800: '#954217',
                    900: '#783816',
                    950: '#411a09'
                },
                bunker: {
                    50: '#f5f7fa',
                    100: '#eaeef4',
                    200: '#d1dbe6',
                    300: '#a9bcd0',
                    400: '#7b99b5',
                    500: '#5b7d9c',
                    600: '#476482',
                    700: '#3a516a',
                    800: '#334559',
                    900: '#2e3c4c',
                    950: '#161c24'
                },
                shark: {
                    50: '#f5f7fa',
                    100: '#eaeff4',
                    200: '#d1dce6',
                    300: '#a9bed0',
                    400: '#7b9cb5',
                    500: '#5b809c',
                    600: '#476782',
                    700: '#3a536a',
                    800: '#334759',
                    900: '#2e3d4c',
                    950: '#212b36'
                },
                primary: {
                    50: '#fcf5f4',
                    100: '#fae8e6',
                    200: '#f6d5d2',
                    300: '#efb7b2',
                    400: '#e48d85',
                    500: '#d6675d',
                    600: '#c4544a',
                    700: '#a23c33',
                    800: '#86352e',
                    900: '#70322c',
                    950: '#3c1613'
                },
                white: {
                    50: '#fafafa',
                    100: '#efefef',
                    200: '#dcdcdc',
                    300: '#bdbdbd',
                    400: '#989898',
                    500: '#7c7c7c',
                    600: '#656565',
                    700: '#525252',
                    800: '#464646',
                    900: '#3d3d3d',
                    950: '#292929'
                },
                black: {
                    50: '#cacfd8',
                    100: '#bcbec8',
                    200: '#a4a7b7',
                    300: '#808499',
                    400: '#595c6e',
                    500: '#414353',
                    600: '#31323f',
                    700: '#272830',
                    800: '#1e1e24',
                    900: '#18181b',
                    950: '#09090b'
                }
            }
        }
    },
    plugins: []
};
