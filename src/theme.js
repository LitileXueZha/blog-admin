import { createMuiTheme } from '@material-ui/core/styles';
import { teal, red } from '@material-ui/core/colors';

/**
 * 主题文件
 *
 * @see https://material-ui.com/customization/theming/
 */
export default createMuiTheme({
    palette: {
        primary: teal,
        secondary: red,
        text: {
            primary: '#24292f',
            secondary: '#57606a',
            hint: '#6e7781',
            disabled: '#6e7781',
        },
        error: {
            main: '#cf222e',
        },
    },
    spacing: 12,
    shape: { borderRadius: 6 },
    typography: {
        fontFamily: ['"Segoe UI"',
            // 跨平台。系统默认
            'system-ui',
            // 苹果系列
            '-apple-system', 'BlinkMacSystemFont',
            // 安卓
            'Roboto',
            // Linux
            '"Noto Sans"', '"Liberation Sans"',
            // 兜底方案
            'Helvetica', 'Arial', 'sans-serif',
            // Emoji 表情
            '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'].join(','),
    },
    overrides: {
        MuiTableCell: {
            head: {
                color: '#24292f',
                fontSize: '0.875rem',
                fontWeight: 600,
            },
        },
        MuiDialogTitle: {
            root: {
                color: '#24292f',
            },
        },
        MuiInputBase: {
            input: {
                fontSize: '14px',
            },
        },
        MuiListItemText: {
            primary: {
                color: '#24292f',
                fontWeight: 500,
            },
            secondary: {
                color: '#57606a',
                textAlign: 'justify',
            },
        },
        MuiIconButton: {
            edgeEnd: {
                marginRight: -16,
            }
        },
    },
});
