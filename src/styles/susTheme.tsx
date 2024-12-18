import { ThemeVars } from '@mysten/dapp-kit';
 
// Light theme copied from dapp-kit
export const susTheme: ThemeVars = {
	blurs: {
		modalOverlay: 'blur(0)',
	},
	backgroundColors: {
		primaryButton: '#064e3b',
    primaryButtonHover: '#097b5d',
		outlineButtonHover: '#0000000',
    modalOverlay: 'rgba(24 36 53 / 20%)',
    modalPrimary: '#FFFFFF',
    modalSecondary: '#F7F8F8',
    iconButton: 'transparent',
    iconButtonHover: '#D1FAE5',
		dropdownMenu: '#FFFFFF',
		dropdownMenuSeparator: '#F3F6F8',
		walletItemSelected: 'white',
		walletItemHover: '#3C424226',
	},
	borderColors: {
		outlineButton: '#E4E4E7',
	},
	colors: {
		primaryButton: '#ffffff',
    outlineButton: '#a1a1aa',
		iconButton: '#000000',
		body: '#182435',
    bodyMuted: '#767A81',
    bodyDanger: '#FF794B',
	},
	radii: {
		small: '4px',
		medium: '6px',
		large: '10px',
		xlarge: '12px',
	},
	shadows: {
		primaryButton: '0px 4px 12px rgba(151, 151, 151, 0)',
		walletItemSelected: '0px 2px 6px rgba(0, 0, 0, 0.05)',
	},
	fontWeights: {
		normal: '400',
    medium: '500',
    bold: '600',
	},
	fontSizes: {
		small: '14px',
		medium: '16px',
		large: '18px',
		xlarge: '20px',
	},
	typography: {
    fontFamily: 'monospace',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: '1',
	},	
};