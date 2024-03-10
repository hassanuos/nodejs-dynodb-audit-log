const AWS = require('aws-sdk');
const DynamoDBWrapper = require('./DynamoDBWrapper');
const CreateTable = require('./CreateTable');
const compareJSON = require('./compareJSON');
const getCurrentDateTime = require('./currentDateTime');
const compareJSONNew = require('./compareJSONNew');

const config = {
    
    // local
    region: 'localhost',
    endpoint: 'http://localhost:8000'
    
    // production

    // region: 'fakeRegion',
    // accessKeyId: 'fakeMyKeyId',
    // secretAccessKey: 'fakeSecretAccessKey'
};

const dynamodbWrapper = new DynamoDBWrapper(config);
const tableName = 'audit-logs';

const response = {
	data:{
		id: 11111,
        name: 'Ass Broadband abc',
        city: 'Log Angles',
        state: 'LA',
        zip: '89169',
		countryId: 'US',
        countryCode: 'US',
        country: 'States',
        address1: '3753 Howard Hughes Parkway',
        address2: 'Suite 200-738',
        website: 'http://www.asiabroadbandinc.com',
        phone: '+1 702-866-9054',
        fax: '770-643-0032',
        twitter: 'https://twitter.com/asiabroadband',
        instagram: '',
        businessDesc: "Asia Broadband Inc. (OTC: AABB) is a resource company focused on the production of precious metals and the accumulation of physical gold holdings. The Company utilizes its specific geographic expertise, experience and extensive industry contacts to facilitate the expansion of precious metals property holdings and production in Mexico. The Company's industry and business integration in Mexico and its asset diversification are unique strengths of AABB that differentiate it from other companies and creates distinctive value for shareholders. Additionally, the Company has a digital assets business segment with its AABBG mine-to-token gold-backed cryptocurrency within its AABB Wallet, the unique Golden Baboons Mining Club non-fungible token collection and a cryptocurrency payment gateway solution PayAABB.com. AABB expects its token to become a world-wide standard of exchange that is stable, secured and trusted with gold backing, while having the added benefit of demand based price appreciation. These are unique and outstanding qualities relative to other cryptocurrencies and digital asset developers.",
        incorporationInformation: [
			{
				stateOfIncorporation: 'qS',
                countryOfIncorporation: 'qSA',
                yearOfIncorporation: '20440'
            }
        ],
        companyInsiders: [
			{
				firstName: "Hassan",
                middleName: "",
                lastName: "Raza",
                corpEntity: "Au2tomated Retail Leasing Partners LP"
            },
            {
				firstName: "Rizwan",
				middleName: "",
				lastName: "Khan",
				corpEntity: "Automated Retail Leasing Partners LP"
            }
		],
        yearOfIncorporation: '1996',
        originalYearofInc: '1996',
        premierDirectorList: [],
        standardDirectorList: [
			{
				name: "Craig Steven Alford",
                firstName: "Craig",
                middleName: "Steven",
                lastName: "Carter",
                title: "Director",
                boards: "Compensation Committee Member, Nominating Committee Member",
                biography: "Mr. Alford holds both an Honors Bachelor of Science and a Master's Degree in Science and is a registered Professional Geoscientist. Mr. Alford has wide-ranging project and business development experience, having worked throughout North and South America, Central Asia, Australia, Africa, Russia and China. His experience has included work on the exploration, operations and the analysis of both conventional energy and new energy projects for several junior and major multinational companies. Mr. Alford has played key roles in raising equity for new projects and developing comprehensive economic analysis for billion-dollar M&A transactions.",
                isPublic: true
            },
            {
				name: "Craig Steven Alford 1",
                firstName: "Craig1" ,
                middleName: "Steven1",
                lastName: "Alford1",
                title: "Director1",
                boards: "1Compensation Committee Member, Nominating Committee Member",
                biography: "Mr. Alford holds both an Honors Bachelor of Science and a Master's Degree in Science and is a registered Professional Geoscientist. Mr. Alford has wide-ranging project and business development experience, having worked throughout North and South America, Central Asia, Australia, Africa, Russia and China. His experience has included work on the exploration, operations and the analysis of both conventional energy and new energy projects for several junior and major multinational companies. Mr. Alford has played key roles in raising equity for new projects and developing comprehensive economic analysis for billion-dollar M&A transactions.",
                isPublic: true
            }
        ],
        officers: [
			{
				name: 'Cris TorresFuck',
                firstName: 'Cris',
                lastName: 'Torres',
                title: 'President, CEO',
                boards: 'CEO',
                isPublic: true
            },
            {
				name: 'Bernard Velez',
                firstName: 'Bernard',
                lastName: 'Velez',
                title: 'CFO, Secretary',
                boards: '',
                isPublic: true
			}
        ],
        fiscalYearEnd: '12/31',
        filingCycle: 'Q',
        edgarFilingStatus: 'Alternative Reporting Standard',
        edgarFilingStatusId: 'A',
        reportingStandard: 'Alternative Reporting Standard',
        reportingStandardMin: 'Alternative Reporting',
        isDark: false,
        deregistered: false,
        is12g32b: false,
        cik: '0001287145',
        isAlternativeReporting: true,
        isBankThrift: false,
        isNonBankRegulated: false,
        isInternationalReporting: false,
        isOtherReporting: false,
        auditedStatusDisplay: 'Audited',
        auditStatus: 'U',
        audited: false,
        email: 'tr@asiabroadbandinc.com',
        numberOfEmployees: 16,
        numberOfEmployeesAsOf: 1703998800000,
        roundLotShareholders: 2000,
        roundLotShareholdersDate: 1703998800000,
        primarySicCode: '1000 - Metal Mining',
        auditors: [
			{
				id: 8366,
                typeId: 5,
                typeName: "Accounting/Auditing Firm",
                name: "GreenGrowth CPAs",
                phone: "+1 800-674-9050",
                countryCode: "US",
                website: "http://https://greengrowthcpas.com",
                countryId: "US",
                country: "United States",
                address1: "10250 Constellation Blvd.",
                city: "Los Angeles",
                stateId: "CA",
                zip: "90067",
                roles: [
					"Accounting/Auditing Firm"
                ],
                isPublic: true,
                hasLogo: false,
                isGoodStanding: true,
                isProhibited: false,
                isQuestionable: false,
                isAttorney: false,
                isSponsor: false,
                public: true
            }
        ],
        investorRelationFirms: [
			{
				id: 7989,
                typeId: 2,
                typeName: 'Investor Relations',
                name: 'FuclResources Unlimited',
                countryId: 'US',
                country: 'United States',
                address1: '1906 S. Audubon Court',
                city: 'Spokane',
                stateId: 'WA',
                zip: '99224',
                roles: ['Accounting/Auditing Fir'],
                isPublic: true,
                hasLogo: false,
                isGoodStanding: false,
                isProhibited: false,
                isQuestionable: true,
                isAttorney: false,
                isSponsor: false,
                public: true
            }
        ],
        legalCounsels: [
			{
				id: 8983,
				typeId: 3,
                typeName: 'Securities Counsel',
                name: 'The Midway Law Firm APC',
                countryId: 'US',
                country: 'United States',
                address1: '4274 Executive Square Suite 200',
                city: 'La JollFa',
                stateId: 'CA',
                zip: '92037',
                roles: ['Accounting/Auditing Firm'],
                isPublic: true,
                hasLogo: false,
                isGoodStanding: true,
                isProhibited: false,
                isQuestionable: false,
                isAttorney: false,
                isSponsor: false,
                public: true
            }
        ],
        investmentBanks: [],
        corporateBrokers: [],
        notes: [
			'Note=12-31-03 company is in the development stage',
            'Formerly=Merendon International, Inc. until 1-01'
        ],
        securities: [
			{
				id: 77679,
                tierId: 20,
                symbol: 'AABB',
                cusip: '04518L100',
                compId: 631505,
                issueName: 'ASIA BROADBAND INC',
                className: 'Class A Common Stock',
                primaryVenue: 'OTC Link',
                categoryId: 2,
                categoryName: 'Current Information',
                isBB: false,
                isPinkSheets: false,
                isNoInfo: false,
                hasLevel2: false,
                isLevel2Entitled: false,
                typeCode: 'CS',
                typeName: 'Common Stock',
                tierName: 'Pink Current',
                tierGroupId: 'PS',
                tierCode: 'PC',
                tierStartDate: 1630641600000,
                tierDisplayName: 'Pink Current Information',
                ratioAdr: 1,
                isAdr: false,
                isGdr: false,
                isTest: false,
                isOtcQX: false,
                isSponsored: false,
                isPiggyBacked: true,
                isQuoteElig: true,
                quoteEligReasons: ['N/A'],
                hasGracePeriod: false,
                isCaveatEmptor: false,
                canAccessBB: false,
                noPar: false,
                parValue: 0.0001,
                outstandingShares: 44401657,
                outstandingSharesAsOfDate: 179442000000,
                authorizedShares: 300000000,
                unlimitedAuthorizedShares: false,
                authorizedSharesAsOfDate: 1609442000000,
                publicFloat: 181532511,
                publicFloatAsOfDate: 1703998800000,
                dtcShares: 2892406861,
                dtcSharesAsOfDate: 1709442000000,
                isExchangeQualified: false,
                shortInterest: 253151,
                shortInterestChange: 2121.4,
                shortInterestDate: 107973200000,
                restrictedShares: 138885568,
                restrictedSharesAsOfDate: 1709442000000,
                unrestrictedShares: 2965516089,
                unrestrictedSharesAsOfDate: 1709442000000,
                sigFailDeliver: false,
                numOfRecordShareholders: 59,
                numOfRecordShareholdersDate: 1596081600000,
                roundLotShareholders: 2000,
                roundLotShareholdersDate: 1703998800000,
                transferAgents: [
                    {
						id: 2454,
                        type: "CS",
                        name: "Transfer Online, Inc.",
                        phone: "+1 503-227-2950",
                        countryCode: "US",
                        website: "http://www.transferonline.com",
                        email: "info@transferonline.com",
                        premierFlag: "Y",
                        countryId: "US",
                        country: "United States",
                        address1: "512 SE Salmon Street",
                        city: "Portland",
                        stateId: "OR",
                        zip: "97214",
                        roles: [
							"Transfer Agent"
                        ],
                        isPublic: true,
                        hasLogo: true,
                        isGoodStanding: true,
                        isProhibited: false,
                        isQuestionable: false,
                        isAttorney: false,
                        isSponsor: false,
                        public: true
                    }
                ],
                isUnsolicited: false,
                showTrustedLogoForAuthorizedShares: true,
                showTrustedLogoForOutstandingShares: true,
                showTrustedLogoForRestrictedShares: true,
                showTrustedLogoForUnrestrictedShares: true,
                showTrustedLogoForDTCShares: true,
                floatSharesSource: 'Issuer'
            }
        ],
        otherSecurities: [],
        estimatedMarketCap: 81335323.4134,
        estimatedMarketCapAsOfDate: 1709269200000,
        blankCheck: false,
        blindPool: false,
        spac: false,
        hasLatestFiling: true,
        latestFilingType: 'Quarterly Report',
        latestFilingDate: 1696046400000,
        latestFilingUrl: '/company/financial-report/385550/content',
        tierGroup: 'PS',
        tierCode: 'PC',
        tierStartDate: 1630641600000,
        hasLogo: false,
        companyLogoUrl: '/company/logo/AABB',
        isCaveatEmptor: false,
        otcAward: { symbol: 'AABB', best50: false },
        indexStatuses:  [
			{
				indexSymbol: ".OTCQX",
                indexName: "OTCQX Composite"
            },
            {
				indexSymbol: ".OTCQXUS",
                indexName: "OTCQX U.S."
            }
        ],
        unableToContact: false,
        isShell: false,
        isBankrupt: false,
        isProfileVerified: true,
        profileVerifiedAsOfDate: '2/07/2024',
        venue: 'OTC Link',
        isUnsolicited: false,
        productServicesDescription: 'Mining production, supply and sale of precious and base metals. Also, gold-backed cryptocurrency tokens, non-fungible token collection and digital payment gateway.\r\n',
        facilitiesDescription: 'Offices and mining field and warehouse facilities in Mexico\r\n',
        execAddr: {
			addr1: '3753 Howard Hughes Parkway',
            addr2: 'Suite 200-738',
            addr3: '',
            city: 'Las Vegas',
            state: 'NV',
            zip: '89169',
            country: 'United States',
            countryId: 'US'
        },
        zeroInsiders: true,
        disclosureUrlOne: '',
        disclosureUrlTwo: ''
    }
}
const recordId = String(response.data.id);
dynamodbWrapper.getItem('ref_id', recordId, tableName)
  .then(parsedData => {
    if (parsedData.length === 0) {
      const old_log = '{}';
      const new_log = JSON.stringify(response.data);
      const date = getCurrentDateTime();

      const itemToCreate = {
        id: dynamodbWrapper.getRandom(6),
        ref_id: recordId,
        old_value: old_log,
        new_value: new_log,
        old_date: date,
        new_date: date,
        entry_status: '1',
      };
      dynamodbWrapper.createItem(itemToCreate, 'audit-logs');
    } else {
      // sort items by desending
      parsedData.sort((a, b) => new Date(b.new_date.S) - new Date(a.new_date.S));
      const oldEntry = (parsedData.length > 1) ? JSON.parse(parsedData[0].latest_object.S) : JSON.parse(parsedData[0].new_value.S);
      const newEntry = response.data;
      const {oldChanges, newChanges} = compareJSONNew(oldEntry, newEntry);
      if (!dynamodbWrapper.isEmptyObject(oldChanges) && !dynamodbWrapper.isEmptyObject(newChanges)) {
        const itemId = parsedData[0].id.S;
        const attributeName = 'entry_status';
        const attributeValue = '0';

        dynamodbWrapper.updateItem(itemId, attributeName, attributeValue, tableName)
          .then(updatedItem => {
            console.log(updatedItem);
        });

        const old_log = JSON.stringify(oldChanges);
        const new_log = JSON.stringify(newChanges);
        const old_date = parsedData[0].new_date.S;
        const new_date = getCurrentDateTime();

        const itemToCreate = {
          id: dynamodbWrapper.getRandom(6),
          ref_id: recordId,
          old_value: old_log,
          new_value: new_log,
          latest_object:JSON.stringify(response.data),
          old_date: old_date,
          new_date: new_date,
          entry_status: '1',
        };

        dynamodbWrapper.createItem(itemToCreate, 'audit-logs');
      }
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });

// dynamodbWrapper.deleteItem('id', '471809', tableName); 
// dynamodbWrapper.allItems(tableName);

// dynamodbWrapper.getItem('ref_id', '11111', tableName)
//   .then(parsedData => {
//     console.log(parsedData);
// })