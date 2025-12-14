import Lottie from 'lottie-react';

const LottieLoader = ({ animationData, size = 200, className = '' }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: size, height: size }}
            />
        </div>
    );
};

export default LottieLoader;
