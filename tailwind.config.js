
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primaryColor: '#7fad39',
                textColor: '#252525',
            },
        },
    },
    plugins: [],
});
