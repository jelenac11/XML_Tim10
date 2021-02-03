<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:zno="http://www.projekat.org/zalba_na_odluku"
    xmlns:common="http://www.projekat.org/common"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    version="2.0">
   <xsl:template match="/">
		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master
					master-name="bookstore-page">
					<fo:region-body margin-top="0.75in"
						margin-bottom="0.75in" margin-left="65pt" margin-right="65pt" />
				</fo:simple-page-master>
			</fo:layout-master-set>
			
			<fo:page-sequence master-reference="bookstore-page">
				<fo:flow flow-name="xsl-region-body">
					<fo:block font-family="Times New Roman" margin-top="30pt"
						font-size="10pt" text-align="center" font-weight="bold">
						ЖАЛБА  ПРОТИВ  ОДЛУКЕ ОРГАНА  ВЛАСТИ КОЈОМ ЈЕ
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="10pt" font-weight="bold">
						<fo:inline text-decoration="underline">ОДБИЈЕН ИЛИ ОДБАЧЕН ЗАХТЕВ</fo:inline> ЗА ПРИСТУП ИНФОРМАЦИЈИ
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt" font-weight="bold" margin-top="12pt">
						Поверенику за информације од јавног значаја и заштиту података о личности
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						Адреса за пошту: <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:adresa_poverenika/common:mesto, ', ')"></xsl:value-of>
                    <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:ulica"></xsl:value-of> бр. <xsl:value-of select="/zno:zalba_na_odluku/zno:adresa_poverenika/common:broj"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt" font-weight="bold" margin-top="24pt">
						Ж А Л Б У
					</fo:block>
					 <xsl:if test='/zno:zalba_na_odluku/zno:zalilac[@xsi:type = "common:TFizicko_lice"]'> 
					 	<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt">
							(<xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:ime, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:prezime"></xsl:value-of>, <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:ulica, ' ')"></xsl:value-of><xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:broj"></xsl:value-of>, <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:mesto"></xsl:value-of>)
						</fo:block>
                     </xsl:if>
                     <xsl:if test='/zno:zalba_na_odluku/zno:zalilac[@xsi:type = "common:TPravno_lice"]'> 
                     	<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt" margin-top="10pt">
                        	(<xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:naziv"></xsl:value-of>, <xsl:value-of select="concat(/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:ulica, ' ')"></xsl:value-of> <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:broj"></xsl:value-of>,  <xsl:value-of select="/zno:zalba_na_odluku/zno:zalilac/common:adresa/common:mesto"></xsl:value-of>)
                        </fo:block>
                     </xsl:if>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt">
						(Име, презиме, односно назив, адреса и седиште жалиоца)
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt" margin-top="12pt">
						против решења-закључка
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt">
						(<xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_resenju/zno:naziv_organa"></xsl:value-of>)
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="center"
						font-size="11pt">
						(назив органа који је донео одлуку)
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt">
						Број <xsl:value-of select="/zno:zalba_na_odluku/@broj_resenja"></xsl:value-of> од <xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_resenju/zno:godina"></xsl:value-of> године.
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="justify" text-indent="3em" margin-top="12pt">
						Наведеном одлуком органа власти (решењем, закључком, обавештењем у писаној форми са елементима одлуке), супротно закону, одбијен-одбачен је мој захтев који сам поднео/ла-упутио/ла дана<xsl:text> </xsl:text>
                        <xsl:variable name="datum" select="substring-after(/zno:zalba_na_odluku/zno:datum_zahteva, '-')"></xsl:variable>
                        <xsl:value-of select="substring(/zno:zalba_na_odluku/zno:datum_zahteva, 9, 9)"></xsl:value-of>.<xsl:value-of select="substring-before($datum, '-')"></xsl:value-of>.<xsl:value-of select="substring-before(/zno:zalba_na_odluku/zno:datum_zahteva, '-')"></xsl:value-of>.
                        године и тако ми ускраћено-онемогућено остваривање уставног и законског права на слободан приступ информацијама од јавног значаја. Oдлуку побијам у целости, односно у делу којим 
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" font-size="11pt">
						<xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:opis"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" font-size="11pt">
						јер није заснована на Закону о слободном приступу информацијама од јавног значаја.
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" text-indent="3em" font-size="11pt">
						На основу изнетих разлога, предлажем да Повереник уважи моју жалбу,  поништи одлука првостепеног органа и омогући ми приступ траженој/им  информацији/ма.
					</fo:block>
					<fo:block font-family="Times New Roman"
						text-align="justify" text-indent="3em" font-size="11pt">
						Жалбу подносим благовремено, у законском року утврђеном у члану 22. ст. 1. Закона о слободном приступу информацијама од јавног значаја.
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt" margin-top="12pt"
						text-align="right">
						<xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:naziv"></xsl:value-of>
						<xsl:value-of select="concat(/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:ime, ' ')"></xsl:value-of>
						<xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:prezime"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						Подносилац жалбе/Име и презиме
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt" margin-top="12pt"
						text-align="right">
						<xsl:value-of select="concat(/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:ulica, ' ')"></xsl:value-of>
						<xsl:value-of select="concat(/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:broj, ', ')"></xsl:value-of>
						<xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:lice/common:adresa/common:mesto"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						адреса
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt" margin-top="12pt"
						text-align="right">
						<xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:podnosilac_zalbe/zno:drugi_podaci_za_kontakt"></xsl:value-of>
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="right">
						други подаци за контакт
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt" margin-top="12pt"
						text-align="right">
						потпис
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="left" margin-top="-50pt" text-indent="3em">
						У
						<xsl:value-of select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:mesto"></xsl:value-of>, 
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt" margin-top="22pt"
						text-align="left" text-indent="4em">
					    дана 
						<xsl:variable name="currenttime" select="/zno:zalba_na_odluku/zno:podaci_o_zalbi/zno:datum_podnosenja" as="xs:date" />
						<xsl:if
							test="number(format-date($currenttime,'[D]')) gt 9">
							<xsl:value-of
								select="format-date($currenttime,'[D]')" />
						</xsl:if>
						<xsl:if
							test="number(format-date($currenttime,'[D]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-date($currenttime,'[D]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) gt 9">
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:value-of
							select="format-date($currenttime,'[Y]')" />
							. године
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="justify" margin-top="40pt" text-indent="1em" font-weight="bold">
						Напомена:
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="11pt"
						text-align="justify" margin-top="5pt">
						•   У жалби се мора навести одлука која се побија (решење, закључак, обавештење), назив органа који је одлуку донео, као и број и датум одлуке. Довољно је да жалилац наведе у жалби у ком погледу је незадовољан одлуком, с тим да жалбу не мора посебно образложити. Ако жалбу изјављује на овом обрасцу, додатно образложење може  посебно приложити. 
					</fo:block>
					<fo:block font-family="Times New Roman" font-size="10pt"
						text-align="justify">
						•	Уз жалбу обавезно приложити копију поднетог захтева и доказ о његовој предаји-упућивању органу као и копију одлуке органа која се оспорава жалбом.
					</fo:block>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>