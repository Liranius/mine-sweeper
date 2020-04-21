import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeScriptPipe } from './safe-script.pipe';
import { SafeStylePipe } from './safe-style.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

// import shared pipes here
export const PIPES = [SafeUrlPipe, SafeScriptPipe, SafeStylePipe, SafeHtmlPipe];
