import './ElectricBorder.css';

const ElectricBorder = ({
    children,
    color = '#D500F9',
    className,
    style
}: any) => {

    const vars = {
        '--electric-border-color': color,
    } as React.CSSProperties;

    return (
        <div className={`electric-border ${className ?? ''}`} style={{ ...vars, ...style }}>
            {/* Background Rings */}
            <div className="eb-ring"></div>
            <div className="eb-ring"></div>
            <div className="eb-ring"></div>

            {/* Content */}
            <div className="eb-content">{children}</div>
        </div>
    );
};

export default ElectricBorder;
